import * as TerraconnectUI from 'terraconnect-ui';
import Route, { RouteProps } from './Route';
import { State, Value, createState } from 'terraconnect-state';
import { HTMLComponent } from 'terraconnect-ui';
import RouteNotFound from './RouteNotFound';

export type RouterProps = {
  children?: typeof Route;
}

type filter<T> = (predicate: (value: T, index: number, array: T[]) => boolean) => State<T[]>;

const Router: TerraconnectUI.ComponentFN<RouterProps> = ({ children }) => {
  let path = window.location.pathname;
  if (!path.endsWith("/")) path += "/";
  let filter = children.filter[Value] as unknown as filter<State<HTMLComponent<RouteProps>>>;
  let routes = filter((route: State<HTMLComponent<{}>>) => route.component[Value] == Route && route.props.path[Value] == path) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps>>>;
  let notFound = filter((route) => route.component[Value] == RouteNotFound) as State<Array<unknown>> as State<Array<HTMLComponent<RouteProps>>>;
  return (
    <>
      {createState((routes, notFound) => routes.length != 0 ? routes : notFound, [routes, notFound])}
    </>
  );
}

export default Router as unknown as TerraconnectUI.Component<RouterProps>;
