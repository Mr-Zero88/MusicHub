import * as TerraconnectUI from 'terraconnect-ui';
import Route, { RouteProps } from './Route';
import { State, Value, createState } from 'terraconnect-state';
import { HTMLComponent } from 'terraconnect-ui';
import RouteNotFound from './RouteNotFound';

type RouterProps = {
  children?: typeof Route;
}

type filter<T> = (predicate: (value: T, index: number, array: T[]) => boolean) => State<T[]>;

export let path = createState(window.location.pathname + (window.location.pathname.endsWith("/") ? "" : "/"));

// ((nativeAssing) => {
//   window.Location.prototype.assign = (url: string | URL) => {
//     if (url instanceof URL)
//       url = url.pathname;
//     window.location.pathname = url;
//     path[Value] = window.location.pathname + (window.location.pathname.endsWith("/") ? "" : "/");
//   };
// })(window.Location.prototype.assign);
// window.location = new window.Location();

export function assign(url: string) {
  url = url.replace(window.location.origin, "");
  window.history.pushState(url, "", url);
  path[Value] = url + (url.endsWith("/") ? "" : "/");
}

window.addEventListener('popstate', (event) => {
  path[Value] = event.state + (event.state.endsWith("/") ? "" : "/");
});

const Router: TerraconnectUI.ComponentFN<RouterProps> = ({ children }) => {
  // let filter = children.filter[Value] as unknown as filter<State<HTMLComponent<RouteProps>>>; WTF WHY
  let filter = children.filter[Value] as unknown as filter<State<{ component: string | TerraconnectUI.Component, props: State<RouteProps> }>>;
  // let routes = filter((route) => route.component[Value] == Route && route.props.path[Value] == path[Value]) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps>>>;
  let notFound = filter((route) => route.component[Value] == RouteNotFound) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps>>>;
  let routes = createState((children: Array<HTMLComponent<RouteProps>>, path) => children.filter((route) => route.component == Route && route.props.path[Value] == path), [children as any, path])
  return (
    <>
      {createState((routes, notFound) => routes.length != 0 ? routes : notFound, [routes, notFound])}
    </>
  );
}

export default Router as unknown as TerraconnectUI.Component<RouterProps>;
