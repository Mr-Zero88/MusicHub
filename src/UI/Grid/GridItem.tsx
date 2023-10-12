import * as TerraconnectUI from 'Terraconnect-UI';
import './GridItem.css';

interface GridItemProps {
  area: string;
}

const GridItem: TerraconnectUI.ComponentFN<GridItemProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
}

export default GridItem as TerraconnectUI.Component<GridItemProps>;
