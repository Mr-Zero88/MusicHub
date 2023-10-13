import { State, Value, createState } from 'terraconnect-state';
import * as TerraconnectUI from 'terraconnect-ui';
import { HTMLComponent } from 'terraconnect-ui/jsx-runtime';

export type RouteProps = {
  path: string;
}

const Route: TerraconnectUI.ComponentFN<RouteProps> = function ({ children }) {
  if (typeof this.props.path[Value] == "string" && !this.props.path[Value].endsWith("/"))
    this.props.path[Value] += "/";
  return (
    <>
      {children}
    </>
  );
}

export default Route as unknown as TerraconnectUI.Component<RouteProps>;
