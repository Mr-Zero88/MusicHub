import { Clinic } from "API/types";
import Grid from 'Components/UI/Grid/Grid';
import GridItem from 'Components/UI/Grid/GridItem';
import { Value } from "terraconnect-state";
import { ComponentFN } from "terraconnect-ui";

export type ClinicListProps = {
  clinics: Array<Clinic>
};

const ClinicList: ComponentFN<ClinicListProps> = ({ clinics }) => {
  return (
    <Grid class="container">
      <GridItem area='1/1/2/2' class="title">
        <h2>Unsere Kliniken</h2>
      </GridItem>
      <GridItem area='2/1/3/2' class="list">
        {clinics.map[Value](item => <a href={item.name}>{item.title}</a>)}
      </GridItem>
      <GridItem area='3/1/4/2' class="copyright">
        <p>terraconnect GmbH 	&copy; 2020 - 2024</p>
      </GridItem>
    </Grid>
  );
}
export default ClinicList;