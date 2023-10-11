import * as TerraconnectUI from 'terraconnect-ui';
import { throttle } from 'terraconnect-throttle';
import './PanelGrid.css';
import { Value } from 'terraconnect-state';

const PanelGrid: TerraconnectUI.ComponentFN = ({ children }) => {
  let mappedChildren = children.map[Value]((child) => {
    return (
      <div>
        {child}
      </div>
    )
  })
  return (
    <div>
      {mappedChildren}
    </div >
  );
}

export default PanelGrid as TerraconnectUI.Component;