import { Value } from 'terraconnect-state';
import * as TerraconnectUI from 'terraconnect-ui';


const ChevronLeft: TerraconnectUI.ComponentFN<{ width: number, height: number, onClick: TerraconnectUI.MouseEventHandler<SVGSVGElement> }> = ({ width, height, onClick }) => (
  <svg style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg" width={width} height={height} onClick={onClick} viewBox="0 0 24 24" fill="none"
    stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
    className="feather feather-chevron-left">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

export default ChevronLeft as TerraconnectUI.Component<{ width: number, height: number, onClick: TerraconnectUI.MouseEventHandler<SVGSVGElement> }>;