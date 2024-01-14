// import Route from 'Components/Router/Route';
// import RouteNotFound from 'Components/Router/RouteNotFound';
// import Router from 'Components/Router/Router';
// import * as TerraconnectUI from 'terraconnect-ui';

// import NodesTestApp from 'Tests/Nodes';
// import CardsTestApp from 'Tests/Cards';
// import LoginTestApp from 'Tests/Login';
// import KlinikenTestApp from 'Tests/Kliniken';
// import StiftTilbeckApp from 'Tests/Stift-Tilbeck';

// const App: TerraconnectUI.Component = () => {
//   let path = window.location.pathname;
//   if (!path.endsWith("/")) path += "/";

//   return (
//     <>
//       {/* {StiftTilbeckApp} */}
//       <Router>
//         <Route path="/">
//           {/* {CardsTestApp} */}
//           <KlinikenTestApp></KlinikenTestApp>
//         </Route>
//         <Route path="/login/">
//           <LoginTestApp></LoginTestApp>
//         </Route>
//         <Route path="/nodes/">
//           {NodesTestApp}
//         </Route>
//         <RouteNotFound>
//           <h1>"{path.slice(1, -1)}" 404 Not Found</h1>
//         </RouteNotFound>
//       </Router>
//     </>
//   );
// }

// export default App;


import Route from 'Components/Router/Route';
import RouteNotFound from 'Components/Router/RouteNotFound';
import Router, { path } from 'Components/Router/Router';
import { createState } from 'terraconnect-state';
import * as TerraconnectUI from 'terraconnect-ui';
import KlinikenTestApp from 'Tests/Kliniken';

const App: TerraconnectUI.Component = () => {
  return (
    <>
      <Router>
        {KlinikenTestApp()}
        <RouteNotFound>
          <h1>"{createState((path: string) => path.slice(1, -1), [path])}" 404 Not Found</h1>
        </RouteNotFound>
      </Router>
    </>
  );
}

export default App;
