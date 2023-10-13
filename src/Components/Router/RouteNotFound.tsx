import * as TerraconnectUI from 'terraconnect-ui';

const RouteNotFound: TerraconnectUI.ComponentFN = function ({ children }) {
  return (
    <>
      {children}
    </>
  );
}

export default RouteNotFound as TerraconnectUI.Component;
