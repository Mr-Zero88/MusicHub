import Route from 'Components/Router/Route';
import RouteNotFound from 'Components/Router/RouteNotFound';
import Router, { path } from 'Components/Router/Router';
import { createState, Modified } from 'terraconnect-state';
import * as TerraconnectUI from 'terraconnect-ui';
import { clinics } from 'API';
import ClinicList from 'UI/ClinicList';
import ClinicInfo from 'UI/ClinicInfo';
import 'App.scss';

const App: TerraconnectUI.Component = () => {
  let cache: Map<string, TerraconnectUI.children> = new Map;
  return createState((clinics) => (
    <Router>
      <Route path="/" component={ClinicList} list={{ clinics }} />
      {clinics.map((clinic) => {
        if (clinic.name == null) return;
        if (!cache.has(clinic.name))
          cache.set(clinic.name, (<Route path={"/" + clinic.name} component={ClinicInfo} id={clinic.id} />));
        return cache.get(clinic.name);
      })}
      <RouteNotFound>
        <h1>"{createState((path: string) => path.slice(1, -1), [path])}" 404 Not Found</h1>
      </RouteNotFound>
    </Router>
  ), [clinics]);
}

export default App;