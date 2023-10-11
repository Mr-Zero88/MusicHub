import * as TerraconnectUI from 'terraconnect-ui';
import * as State from 'terraconnect-state';
import { throttle } from 'terraconnect-throttle';
import './CardGrid.css';

const CardGrid: TerraconnectUI.ComponentFN = ({ children }) => {
  let girdSize = State.createState({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
  window.addEventListener('resize', () => girdSize[State.Value] = { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
  let gridColummCount = State.createState(() => Math.floor((girdSize[State.Value].width - 20) / 110), [girdSize]);
  let girdElementSize = State.createState(() => (girdSize[State.Value].width - 20 - 10 * (gridColummCount[State.Value] - 1)) / gridColummCount[State.Value], [girdSize, gridColummCount]);

  let rChildren = (children.reduce[State.Value]((a, b, i) => {
    if (Array.isArray(b[State.Value]))
      a.push(...b[State.Value]);
    else
      a.push(b[State.Value]);
    console.log("rChildren");
    return a;
  }, []) as State.State<any>).filter[State.Value]((_: any) => _ != null) as typeof children;

  let positions: Array<Array<number>> = [];
  let calc = () => {
    let offset = 0;
    positions = [];
    return rChildren[State.Value].map((child, i) => {
      let card: Element = (child as Element);
      if (card.localName != "app-card")
        card = Array.from(card.children).find(_ => _.localName == "app-card") ?? card;
      let width = JSON.parse(card.getAttribute('width') ?? "1");
      let height = JSON.parse(card.getAttribute('height') ?? "1");
      let size: [number | [number, number], number | [number, number]] = [
        typeof width == "number" ? width : [width.min, width.max],
        typeof height == "number" ? height : [height.min, height.max]
      ];
      if (Array.isArray(size[0]))
        size[0] = Math.max(size[0][0], Math.min(size[0][1], gridColummCount[State.Value]));
      if (Array.isArray(size[1]))
        size[1] = size[1][1]
      if (positions.length == 0 || positions[positions.length - 1].length + size[0] - 1 >= gridColummCount[State.Value])
        positions.push([]);
      let x = positions[positions.length - 1].length;
      let y = positions.length - 1;
      for (let indexY = 0; indexY < size[1]; indexY++) {
        if (indexY != 0 && positions.length - 1 <= y + indexY)
          positions.push([]);
        for (let indexX = 0; indexX < size[0]; indexX++)
          positions[positions.length - 1].push(i);
      }
      offset += size[1];

      console.log("mappedChildren");
      return (
        <div style={{ gridArea: `${y + 1}/${x + 1}/${y + size[1] + 1}/${x + size[0] + 1}` }
        }> {child} </div>
      );
    });
  }
  let callCalc = throttle(() => mappedChildren[State.Value] = calc(), 1);
  const applyListeners = (child: Element) => {
    let card = child;
    if (card.localName != "app-card")
      card = Array.from(card.children).find(_ => _.localName == "app-card") ?? card;
    (card as unknown as { props: any }).props.width?.[State.Modified].on(callCalc);
    (card as unknown as { props: any }).props.height?.[State.Modified].on(callCalc);
  }
  rChildren[State.Value].forEach(applyListeners);
  rChildren[State.ChildModified].on((child, key) => {
    if (typeof key == "string" && !key.includes('.'))
      applyListeners(child);
  });

  let mappedChildren = State.createState(calc,
    [rChildren, gridColummCount]
  );

  let gridRowsCount = State.createState(() => positions.length, [mappedChildren]);

  return (
    <div data-grid-columm-count={gridColummCount} data-grid-rows-count={gridRowsCount} data-gird-element-size={girdElementSize}>
      {mappedChildren}
    </div >
  );
}

export default CardGrid as TerraconnectUI.Component;