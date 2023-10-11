import * as TerraconnectUI from 'Terraconnect-UI';
import './Panel.css';

interface PanelProps {
  background?: string;
  width?: number | { min: number, max: number },
  height?: number | { min: number, max: number },
  onClick?: TerraconnectUI.MouseEventHandler;
}

const Panel: TerraconnectUI.Component<PanelProps> = ({ onClick, children }) => {
  return (
    <div onClick={onClick} >
      <div>
        {children}
      </div>
    </div>
  );
}

export default Panel;
