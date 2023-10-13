import Route from 'Components/Router/Route';
import RouteNotFound from 'Components/Router/RouteNotFound';
import Router from 'Components/Router/Router';
import * as TerraconnectUI from 'terraconnect-ui';

import NodesTestApp from 'Tests/Nodes';
import CardsTestApp from 'Tests/Cards';

const App: TerraconnectUI.Component = () => {
  let path = window.location.pathname;
  if (!path.endsWith("/")) path += "/";

  return (
    <>
      <Router>
        <Route path="/">
          {CardsTestApp}
        </Route>
        <Route path="/nodes/">
          {NodesTestApp}
        </Route>
        <RouteNotFound>
          <h1>"{path.slice(1, -1)}" 404 Not Found</h1>
        </RouteNotFound>
      </Router>
    </>
  );
}

export default App;
