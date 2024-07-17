import { createState, PreserveState, Value } from 'terraconnect-state';
import { jsx } from 'terraconnect-ui/jsx-runtime';
import { assign } from './Router';
import { children, Component, ComponentFN, HTMLComponent } from 'terraconnect-ui/*';

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

  let cache: null | children = null;
  let content = createState((visible: boolean, component: Component) => {
    if (visible) {
      if (cache != null)
        return [cache];
      cache = jsx(component, args);
      let clickRoute = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        assign((event.target as HTMLAnchorElement).href);
      };
      let assignRoute = (route: HTMLComponent<RouteProps<any, any>>) => route.querySelectorAll('a').forEach((element) => {
        element.removeEventListener('click', clickRoute);
        element.addEventListener('click', clickRoute);
      });
      assignRoute(cache as any);
      return [cache];
    }
    return <></>
  }, [(this as any).visible, component]);
  return content;
}

export default Route as unknown as Component<RouteProps<any, any>>;
