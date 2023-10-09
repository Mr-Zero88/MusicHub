const parseParam = (params: string) => {
  var spaceStart = params.indexOf(' '), commaStart = params.indexOf(','), attribute = '', unit = '', fallback = '';
  if (spaceStart !== -1) {
    attribute = params.substring(0, spaceStart).trim();
    if (commaStart !== -1) {
      unit = params.substring(spaceStart + 1, commaStart).trim();
    } else {
      unit = params.substring(spaceStart + 1).trim();
    }
  } else
    attribute = params;
  if (commaStart !== -1) {
    fallback = params.substring(commaStart + 1).trim();
  }
  return { attribute, unit, fallback };
}
const parse = (property: string, value: string) => {
  if (!property || !value) return null;
  var result = [], attr = [], last = 0, i = 0, funcStart, funcEnd;
  // Simple check to see if there is a valid function statement.
  if (value.indexOf('(') !== -1 && value.split("(").length === value.split(")").length) {
    // Search for the attr( function
    while ((i = value.indexOf("attr(", last)) !== -1) {
      funcStart = i + 5; // Add 5 for attr(
      funcEnd = value.indexOf(")", funcStart);
      // Add letters between each attr() occurence
      if (i - last !== 0)
        result.push('"' + value.substring(last, i) + '"');
      // Parse attr() function for paramater
      var { attribute, unit, fallback } = parseParam(value.substring(funcStart, funcEnd));
      if (attribute === '') return null; // Empty attr() function
      // Translate it to Javascript
      let valueSuffix = null;
      if (unit != "color" && unit != "number" && unit != "")
        valueSuffix = unit;
      result.push(`(n.hasAttribute("${attribute}") ? n.getAttribute("${attribute}")${valueSuffix ? ` + "${valueSuffix}"` : ''} : "${fallback}")`);
      // Add the Attribute to the attrCache
      attr.push(attribute);
      last = ++funcEnd;
    }
    if (last > 0) {
      // Add the remaining string after the last attr() function
      if (value.substring(last).length != 0)
        result.push(' "' + value.substring(last) + '"');
      return {
        // Build new JavaScript Function
        func: new Function('n', 'return ' + result.join(' + ')),
        attr: attr,
        cssProp: property
      };
    }
  }
  return null;
}
let rules: Array<{
  selector: string,
  property: string,
  format: Function
}> = [];
const parseCss = (element: Element) => {
  rules = [];
  let css = Array.from(document.querySelectorAll('style')).map(_ => _.innerHTML).join('\n');
  const cssRule = /\s*(.*?)\s*{([^}]*)}/g, cssParse = /\s*(.*?)\s*:\s*([^;]*?);/g;
  css = css.replace(/(?:\r|\n)/g, '').replace(/\/\*.+?\*\//g, '').toLowerCase();
  let ruleMatch, propMatch;
  while ((ruleMatch = cssRule.exec(css)) !== null) {
    var selector = ruleMatch[1], body = ruleMatch[2];
    while ((propMatch = cssParse.exec(body)) !== null) {
      var parsedCssValue = parse(propMatch[1], propMatch[2]);
      if (parsedCssValue !== null) {
        let property = parsedCssValue.cssProp;
        let format = parsedCssValue.func;
        rules.push({ selector, property, format })
      }
    }
  }
}
const applyAttributeStyle = (element: HTMLElement) => {
  let matches = rules.map<[Array<HTMLElement>, typeof rules[any]]>(rule => [Array.from(element.querySelectorAll<HTMLElement>(rule.selector)), rule]).filter(([elements]) => elements.length != 0);
  if (matches.length == 0) return;
  matches.forEach(([elements, rule]) => elements.forEach(element => element.style.setProperty(rule.property, rule.format(element))));
}

((naiveSetAttribute) => {
  HTMLElement.prototype.setAttribute = function setAttribute(qualifiedName: string, value: string) {
    naiveSetAttribute.bind(this)(qualifiedName, value);
    if (this.parentElement)
      applyAttributeStyle(this.parentElement);
  }
})(HTMLElement.prototype.setAttribute);

((naiveRemoveAttribute) => {
  HTMLElement.prototype.removeAttribute = function removeAttribute(qualifiedName: string) {
    naiveRemoveAttribute.bind(this)(qualifiedName);
    if (this.parentElement)
      applyAttributeStyle(this.parentElement);
  }
})(HTMLElement.prototype.removeAttribute);

((naiveAppend) => {
  HTMLElement.prototype.append = function append(...nodes: (string | Node)[]) {
    naiveAppend.bind(this)(...nodes);
    if (nodes.some(_ => !(typeof _ == "string") && _ instanceof HTMLElement && _.localName == "style"))
      parseCss(this);
    applyAttributeStyle(this);
  }
})(HTMLElement.prototype.append);

export { };