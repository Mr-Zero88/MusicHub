import * as TerraconnectUI from 'terraconnect-ui';
import Route, { RouteProps } from './Route';
import { ChildModified, Modified, State, Value, createState } from 'terraconnect-state';
import { HTMLComponent } from 'terraconnect-ui';
import RouteNotFound from './RouteNotFound';

type RouterProps = {
  children?: typeof Route;
}

type filter<T> = (predicate: (value: T, index: number, array: T[]) => boolean) => State<T[]>;

export let path = createState((window.location.pathname + (window.location.pathname.endsWith("/") ? "" : "/")).replace("/index.html/", "/"));

export function assign(url: string) {
  url = url.replace(window.location.origin, "");
  window.history.pushState(url, "", url);
  path[Value] = url + (url.endsWith("/") ? "" : "/");
}

window.addEventListener('popstate', (event) => {
  let state: string = event.state ?? "/";
  state += (state.endsWith("/") ? "" : "/");
  state = state.replace("/index.html/", "/");
  path[Value] = state;
});

const Router: TerraconnectUI.ComponentFN<RouterProps> = ({ children }) => {
  // let filter = children.filter[Value] as unknown as filter<State<HTMLComponent<RouteProps>>>; WTF WHY
  let filter = children.filter[Value] as unknown as filter<State<{ component: string | TerraconnectUI.Component, props: State<RouteProps> }>>;
  // let routes = filter((route) => route.component[Value] == Route && route.props.path[Value] == path[Value]) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps>>>;
  let notFound = filter((route) => route.component[Value] == RouteNotFound) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps>>>;
  let routes = createState((children: Array<HTMLComponent<RouteProps>>, path) => children.filter((route) => route.component == Route && route.props.path[Value] == path), [children as any, path])
  let route = createState((routes, notFound) => routes.length != 0 ? routes : notFound, [routes, notFound]);
  let assignRoute = (route: TerraconnectUI.HTMLComponent<RouteProps>) => route.querySelectorAll('a').forEach((element) => element.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    assign(element.href);
  }));
  route[Modified].on((routes) => routes.forEach(assignRoute));
  route[Value].forEach(assignRoute);
  return (
    <>
      {route}
    </>
  );
}

export default Router as unknown as TerraconnectUI.Component<RouterProps>;
