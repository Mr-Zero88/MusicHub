import "./Pollyfill/css-attr";
import "./Pollyfill/cause";
import "./index.css";
import App from "./App";
document.title = "Unsere Kliniken";
window.appRoot?.remove();
let root = <App></App>;
document.body.append(root);
window.appRoot = root;
if ("hot" in module)
  // @ts-ignore
  module.hot.accept();
declare global {
  var appRoot: Element | null;
}