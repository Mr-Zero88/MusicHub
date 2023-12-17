import * as TerraconnectUI from 'terraconnect-ui';

import Router from 'Components/Router/Router';
import Route from 'Components/Router/Route';
import RouteNotFound from 'Components/Router/RouteNotFound';

import './markdown.scss';

import Welcome from './Content/Herzlich willkommen im Stift Tilbeck.mdx';
import SanktJosef from './Content/Sankt Josef.mdx';
import SanktFranziskus from './Content/Sankt Franziskus.mdx';
import StLudgerStElisabeth from './Content/St. Ludger & St. Elisabeth.mdx';
import Wasserturm from './Content/Wasserturm.mdx';
import Friedhof from './Content/Friedhof.mdx';

import Map from './Map';
import Buttons from './Buttons';

export default (
  <>
    <Map></Map>
    <Router>
      <Route path="/">
        <Welcome></Welcome>
      </Route>
      <Route path="/SanktJosef">
        <SanktJosef></SanktJosef>
      </Route>
      <Route path="/SanktFranziskus">
        <SanktFranziskus></SanktFranziskus>
      </Route>
      <Route path="/StLudger&StElisabeth">
        <StLudgerStElisabeth></StLudgerStElisabeth>
      </Route>
      <Route path="/Wasserturm">
        <Wasserturm></Wasserturm>
      </Route>
      <Route path="/Friedhof">
        <Friedhof></Friedhof>
      </Route>
      <RouteNotFound>
        Hier bist du falsch!
        <Buttons previous=''></Buttons>
      </RouteNotFound>
    </Router>
  </>
);