import { createState, PreserveState } from 'terraconnect-state';
import * as TerraconnectUI from 'terraconnect-ui';

const RouteNotFound: TerraconnectUI.ComponentFN = function ({ children }) {
  (this as any).visible = createState(false);
  (this as any).visible[PreserveState] = true;
  return (
    <>
      {children}
    </>
  );
}

export default RouteNotFound as TerraconnectUI.Component;
