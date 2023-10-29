import * as TerraconnectUI from 'Terraconnect-UI';
import { Value } from 'terraconnect-state';

const date: TerraconnectUI.ComponentFN = ({ children }) => {
  let date = (children[Value][0] as Node as Text).data;
  console.log(date);
  return (
    <>
      {timeDifference(Date.now(), new Date(date).getTime())}
    </>
  );
}

export default date as TerraconnectUI.Component;

function timeDifference(current: number, previous: number) {

  console.log(current, previous)

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return `vor ${Math.round(elapsed / 1000)} Sekunden`;
  }

  else if (elapsed < msPerHour) {
    return `vor ${Math.round(elapsed / msPerMinute)} Minuten`;
  }

  else if (elapsed < msPerDay) {
    return `vor ${Math.round(elapsed / msPerHour)} Stunden`;
  }

  else if (elapsed < msPerMonth) {
    return `vor ${Math.round(elapsed / msPerDay)} Tagen`;
  }

  else if (elapsed < msPerYear) {
    return `vor ${Math.round(elapsed / msPerMonth)} Monaten`;
  }

  else {
    return `vor ${Math.round(elapsed / msPerYear)} Jahren`;
  }
}