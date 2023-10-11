import * as TerraconnectUI from 'terraconnect-ui';
import { Value, createState } from 'terraconnect-state';
import Card from './UI/Cards/Card';
import CardGrid from './UI/Cards/CardGrid';
import PanelGrid from './UI/Panels/PanelGrid';
import Panel from './UI/Panels/Panel';

const App: TerraconnectUI.Component = () => {
  return (
    <>
      {/* <CardGrid>
        <Card>Test</Card>
      </CardGrid> */}
      <PanelGrid>
        <Panel>Test</Panel>
      </PanelGrid>
    </>
  );
}

export default App;
