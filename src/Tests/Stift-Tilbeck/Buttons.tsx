import * as TerraconnectUI from 'Terraconnect-UI';
import { Value } from 'terraconnect-state';

interface ButtonsProps {
  next: string;
  previous: string;
}

const Buttons: TerraconnectUI.ComponentFN<ButtonsProps> = ({ next, previous }) => {
  return (
    <>
      <button className="previous" data-previous={previous != null ? true : null} onClick={() => window.location.assign(`${window.location.origin}/${previous}`)}>Zurück</button>
      <button className="next" data-next={next != null ? true : null} onClick={() => window.location.assign(`${window.location.origin}/${next}`)}>Weiter</button>
    </>
  );
}

export default Buttons as TerraconnectUI.Component<ButtonsProps>;
