import * as TerraconnectUI from 'terraconnect-ui';
import { Value, createState } from 'terraconnect-state';

let test = createState(0);

const App: TerraconnectUI.Component = () => {
  return (
    <>
      <div onClick={() => test[Value]++}>Test 3 {test}</div>
    </>
  );
}

export default App;
