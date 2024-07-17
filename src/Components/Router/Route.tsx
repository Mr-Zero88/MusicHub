import { ChildModified, createState, PreserveState, Value } from 'terraconnect-state';
import { jsx } from 'terraconnect-ui/jsx-runtime';
import { assign } from './Router';
import { children, Component, ComponentFN, HTMLComponent } from 'terraconnect-ui';

export type RouteProps<T extends Component<K>, K> = {
  path: string;
  component: T;
} & K;

const Route: ComponentFN<RouteProps<any, any>> = function (props) {
  let { component, path, ...args } = props;
  if (typeof this.props.path[Value] == "string" && !this.props.path[Value].endsWith("/"))
    this.props.path[Value] += "/";
  (this as any).visible = createState(false);
  (this as any).visible[PreserveState] = true;

  let clickRoute = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    assign((event.target as HTMLAnchorElement).href);
  };

  this.addEventListener('mount', ({ target }) => {
    if (target == null) return; target
    let element = target as HTMLElement;
    if (element.tagName == "A") {
      element.removeEventListener('click', clickRoute);
      element.addEventListener('click', clickRoute);
    }
  }, {});

  let cache: null | children = null;
  return createState((visible: boolean, component: Component) => {
    if (!visible) return <></>
    if (cache == null)
      cache = jsx(component, args);
    return [cache];
  }, [(this as any).visible, component]);
}

export default Route as unknown as Component<RouteProps<any, any>>;
