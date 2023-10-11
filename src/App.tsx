import * as TerraconnectUI from 'terraconnect-ui';
import { Value, createState } from 'terraconnect-state';
import Card from './UI/Card';
import CardGrid from './UI/CardGrid';

const App: TerraconnectUI.Component = () => {
  return (
    <>
      <CardGrid>
        <Card>Test</Card>
      </CardGrid>
    </>
  );
}

export default App;
