import * as TerraconnectUI from 'Terraconnect-UI';
import './Grid.css';
import GridItem from './GridItem';

interface GridProps {
  children: typeof GridItem;
}

const Grid: TerraconnectUI.Component<GridProps> = function ({ children }) {
  return (
    <>
      {children}
    </>
  );
}

export default Grid;
