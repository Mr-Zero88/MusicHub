import * as TerraconnectUI from 'Terraconnect-UI';
import './Card.css';

interface CardProps {
  background?: string;
  width?: number | { min: number, max: number },
  height?: number | { min: number, max: number },
  onClick?: TerraconnectUI.MouseEventHandler;
}

const Card: TerraconnectUI.Component<CardProps> = ({ onClick, children }) => {
  return (
    <div onClick={onClick}>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Card;
