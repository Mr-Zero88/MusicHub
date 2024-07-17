import Route from 'Components/Router/Route';
import RouteNotFound from 'Components/Router/RouteNotFound';
import Router, { path } from 'Components/Router/Router';
import { createState, Modified, Value } from 'terraconnect-state';
import { clinics } from 'API';
import ClinicList from 'UI/ClinicList';
import ClinicInfo from 'UI/ClinicInfo';
import 'App.scss';
import { children, Component } from 'terraconnect-ui';
import { Clinic } from 'API/types';
import IsMobile from 'UI/IsMobile';

const App: Component = () => {
  let cache: Map<string, children> = new Map;
  return (
    <IsMobile>
      <Router>
        <Route path="/" component={ClinicList} clinics={clinics} />
        {clinics.map[Value]((clinic) => {
          if (clinic.name == null || clinic.name[Value] == null) return;
          if (!cache.has(clinic.name[Value]))
            cache.set(clinic.name[Value], (<Route path={"/" + clinic.name[Value]} component={ClinicInfo} id={clinic.id} />));
          return cache.get(clinic.name[Value]);
        })}
        <RouteNotFound>
          <h1>"{createState((path: string) => path.slice(1, -1), [path])}" 404 Not Found</h1>
        </RouteNotFound>
      </Router>
    </IsMobile>
  );
}

export default App;




// return createState((clinics) => (
//   <Router>
//     <Route path="/" component={ClinicList} clinics={clinics} />
//     {clinics.map((clinic) => {
//       if (clinic.name == null) return;
//       if (!cache.has(clinic.name))
//         cache.set(clinic.name, (<Route path={"/" + clinic.name} component={ClinicInfo} id={clinic.id} />));
//       return cache.get(clinic.name);
//     })}
//     <RouteNotFound>
//       <h1>"{createState((path: string) => path.slice(1, -1), [path])}" 404 Not Found</h1>
//     </RouteNotFound>
//   </Router>
// ), [clinics]);