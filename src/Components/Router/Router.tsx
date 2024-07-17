import * as TerraconnectUI from 'terraconnect-ui';
import Route, { RouteProps } from './Route';
import { Modified, State, Value, createState } from 'terraconnect-state';
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
  let flattenedChildren = flattenChildren(children as unknown as State<Array<TerraconnectUI.HTMLComponent<RouteProps<any, any>>>>);
  let notFound = createState((children) => children.filter((route) => route.component == RouteNotFound), [flattenedChildren]);
  let routes = createState((children, path) => children.filter((route) => route.component == Route && route.props.path[Value] == path), [flattenedChildren, path]);
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

function isHTMLComponent<T>(value: any): value is State<HTMLComponent<T>> {
  return value != null;
}

function flattenChildren(children: State<Array<TerraconnectUI.HTMLComponent<any>>>) {
  return (children.reduce[Value]((a, b, i) => {
    if (b == null)
      console.log("b")
    else if (Array.isArray(b[Value]))
      a.push(...flattenChildren(b)[Value]);
    else
      a.push(b[Value]);
    return a;
  }, [] as Array<TerraconnectUI.HTMLComponent<any>>)).filter[Value]<Array<TerraconnectUI.HTMLComponent<any>>>(isHTMLComponent);
}

export default Router as unknown as TerraconnectUI.Component<RouterProps>;
