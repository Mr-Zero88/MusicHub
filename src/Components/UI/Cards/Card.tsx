import * as TerraconnectUI from 'Terraconnect-UI';
import './Card.css';
import { Value, isState } from 'terraconnect-state';

interface CardProps {
  background?: string;
  width?: number | { min: number, max: number },
  height?: number | { min: number, max: number },
  onClick?: TerraconnectUI.MouseEventHandler;
}

const Card: TerraconnectUI.ComponentFN<CardProps> = ({ onClick, children }) => {
  return (
    <>
      <CardContent onClick={onClick}>
        {children}
      </CardContent>
    </>
  );
}

interface CardContentProps {
  onClick?: TerraconnectUI.MouseEventHandler;
}

const CardContent: TerraconnectUI.Component<CardContentProps> = function ({ onClick, children }) {
  if (isState(onClick) && onClick[Value] != null)
    this.addEventListener("click", onClick[Value] as unknown as (event: Event) => void);
  else if (!isState(onClick) && onClick != null)
    this.addEventListener("click", onClick as unknown as (event: Event) => void);
  return (
    <>
      {children}
    </>
  );
} as TerraconnectUI.ComponentFN<CardContentProps> as TerraconnectUI.Component<CardContentProps>;

export default Card as TerraconnectUI.Component<CardProps>;
