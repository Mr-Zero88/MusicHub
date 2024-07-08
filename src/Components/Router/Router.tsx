import * as TerraconnectUI from 'terraconnect-ui';
import Route, { RouteProps } from './Route';
import { ChildModified, Modified, State, Value, createState } from 'terraconnect-state';
import { HTMLComponent } from 'terraconnect-ui';
import RouteNotFound from './RouteNotFound';

type RouterProps = {
  children?: typeof Route;
}

type filter<T> = (predicate: (value: T, index: number, array: T[]) => boolean) => State<T[]>;

export let path = createState(decodeURI(window.location.pathname + (window.location.pathname.endsWith("/") ? "" : "/")).replace("/index.html/", "/"));

export function assign(url: string) {
  url = url.replace(window.location.origin, "");
  window.history.pushState(url, "", url);
  path[Value] = decodeURI(url + (url.endsWith("/") ? "" : "/"));
}

export function back() {
  window.history.back();
}

window.addEventListener('popstate', (event) => {
  let state: string = event.state ?? "/";
  state += (state.endsWith("/") ? "" : "/");
  state = state.replace("/index.html/", "/");
  path[Value] = decodeURI(state);
});

const Router: TerraconnectUI.ComponentFN<RouterProps> = ({ children }) => {
  children = flattenChildren(children as unknown as State<Array<TerraconnectUI.HTMLComponent<any>>>) as unknown as typeof children;
  // let filter = children.filter[Value] as unknown as filter<State<HTMLComponent<RouteProps>>>; WTF WHY
  let filter = children.filter[Value] as unknown as filter<State<{ component: string | TerraconnectUI.Component, props: State<RouteProps<any, any>> }>>;
  // let routes = filter((route) => route.component[Value] == Route && route.props.path[Value] == path[Value]) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps>>>;
  let notFound = filter((route) => route.component[Value] == RouteNotFound) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps<any, any>>>>;
  let routes = createState((children: Array<HTMLComponent<RouteProps<any, any>>>, path) => children.filter((route) => route.component == Route && route.props.path[Value] == path), [children as any, path]);
  // console.log(children, path);
  let route = createState((routes, notFound) => routes.length != 0 ? routes : notFound, [routes, notFound]);
  route[Modified].on((newRoute, oldRoute) => {
    (oldRoute[0] as any).visible[Value] = false;
    (newRoute[0] as any).visible[Value] = true;
  });
  route[Value].forEach((route) => (route as any).visible[Value] = true);
  return (
    <>
      {route}
    </>
  );
}
function flattenChildren(children: State<Array<TerraconnectUI.HTMLComponent<any>>>) {
  return (children.reduce[Value]((a, b, i) => {
    if (Array.isArray(b[Value]))
      a.push(...flattenChildren(b)[Value]);
    else
      a.push(b[Value]);
    return a;
  }, [] as Array<TerraconnectUI.HTMLComponent<any>>) as State<any>).filter[Value]((_: any) => _ != null) as typeof children;
}

export default Router as unknown as TerraconnectUI.Component<RouterProps>;
