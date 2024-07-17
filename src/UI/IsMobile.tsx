import { Clinic } from "API/types";
import Grid from 'Components/UI/Grid/Grid';
import GridItem from 'Components/UI/Grid/GridItem';
import { Value } from "terraconnect-state";
import { Component, ComponentFN } from "terraconnect-ui";

const IsMobile: ComponentFN = function ({ children }) {
  setInterval(() => {
    // @ts-expect-error
    if (navigator.userAgentData.mobile)
      this.classList.add('mobile');
    else
      this.classList.remove('mobile');
  }, 100);
  return (
    <>
      {children}
    </>
  );
}
export default IsMobile as Component;