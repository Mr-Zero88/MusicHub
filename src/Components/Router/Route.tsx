import { createState, PreserveState, Value } from 'terraconnect-state';
import * as TerraconnectUI from 'terraconnect-ui';
import { jsx } from 'terraconnect-ui/jsx-runtime';
import { HTMLComponent } from 'terraconnect-ui';
import { assign } from './Router';


// export type RouteProps = {
//   path: string;
// }

// const Route: TerraconnectUI.ComponentFN<RouteProps> = function ({ children }) {
//   if (typeof this.props.path[Value] == "string" && !this.props.path[Value].endsWith("/"))
//     this.props.path[Value] += "/";
//   return (
//     <>
//       {children}
//     </>
//   );
// }

export type RouteProps<T extends TerraconnectUI.Component<K>, K> = {
  path: string;
  component: T;
} & K;

const Route: TerraconnectUI.ComponentFN<RouteProps<any, any>> = function (props) {
  let { component, path, ...args } = props;
  if (typeof this.props.path[Value] == "string" && !this.props.path[Value].endsWith("/"))
    this.props.path[Value] += "/";
  (this as any).visible = createState(false);
  (this as any).visible[PreserveState] = true;

  let cache: null | TerraconnectUI.children = null;
  let content = createState((visible: boolean) => {
    if (visible) {
      if (cache != null)
        return [cache];
      cache = jsx(component, args);
      let clickRoute = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        assign((event.target as HTMLAnchorElement).href);
      };
      let assignRoute = (route: TerraconnectUI.HTMLComponent<RouteProps<any, any>>) => route.querySelectorAll('a').forEach((element) => {
        element.removeEventListener('click', clickRoute);
        element.addEventListener('click', clickRoute);
      });
      assignRoute(cache as any);
      return [cache];
    }
    return <></>
  }, [(this as any).visible]);
  return content;
}

export default Route as unknown as TerraconnectUI.Component<RouteProps<any, any>>;
