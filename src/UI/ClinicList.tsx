import * as TerraconnectUI from 'terraconnect-ui';
import { Clinic } from "API/types";
import Grid from 'Components/UI/Grid/Grid';
import GridItem from 'Components/UI/Grid/GridItem';

export type ClinicListProps = {
  list: {
    clinics: Array<Clinic>
  }
};

const ClinicList: TerraconnectUI.ComponentFN<ClinicListProps> = ({ list }) => {
  let _list = list.clinics as unknown as Array<Clinic>;
  return (
    <Grid class="container">
      <GridItem area='1/1/2/2' class="title">
        <h2>Unsere Kliniken</h2>
      </GridItem>
      <GridItem area='2/1/3/2' class="list">
        {_list.map((item) => <a href={item.name}>{item.title}</a>)}
      </GridItem>
      <GridItem area='3/1/4/2' class="copyright">
        <p>terraconnect GmbH 	&copy; 2020 - 2024</p>
      </GridItem>
    </Grid>
  );
}
export default ClinicList;