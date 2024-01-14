import * as TerraconnectUI from 'terraconnect-ui';
import Grid from '../../Components/UI/Grid/Grid';
import './kliniken.scss';
import GridItem from '../../Components/UI/Grid/GridItem';
import Route from 'Components/Router/Route';
import { State } from 'terraconnect-state';
import ChevronLeft from 'Icons/chevron-left';
import { back } from 'Components/Router/Router';
// const ChevronLeft = require(require("../../Icons/chevron-left.svg").default);

const Kliniken = () => {
  let list = [
    "Ambulantes OP-Zentrum",
    "Augenheilkunde (Belegabteilung)",
    "Hals-Nasen-Ohren (Belegabteilung)",
    "Institut für Diagnostische und Interventionelle Radiologie",
    "Klinik für Allgemeine Innere Medizin und Altersmedizin",
    "Klinik für Allgemeine Innere Medizin und Palliativmedizin",
    "Klinik für Allgemein- und Viszeralchirurgie",
    "Klinik für Altersmedizin",
    "Klinik für Anästhesiologie und Intensivmedizin",
    "Klinik für Frauenheilkunde und Geburtshilfe",
    "Klinik für Frauenheilkunde, Geburtshilfe und Reproduktionsmedizin - Eltern-Kind-Zentrum (Balg)",
    "Klinik für Frauenheilkunde, Geburtshilfe und Reproduktionsmedizin - Kinderwunschzentrum (Bühl)",
    "Klinik für Gastroenterologie und Allgemeine Innere Medizin",
    "Klinik für Gefäßchirurgie",
    "Klinik für Hämatologie und Onkologie",
    "Klinik für Hand- und Plastische Chirurgie",
    "Klinik für Kardiologie, Angiologie und Allgemeine Innere Medizin (Rastatt)",
    "Klinik für Kardiologie und Angiologie (Balg)",
    "Klinik für Kinder- und Jugendmedizin",
    "Klinik für Neurologie",
    "Klinik für Orthopädie und Unfallchirurgie",
    "Klinik für Orthopädie und Unfallchirurgie",
    "Klinik für Palliativmedizin",
    "Klinik für Schmerzmedizin",
    "Klinik für Unfallchirurgie",
    "Klinik für Urologie"
  ]
  return (
    <>
      <Route path="/">
        <Grid class="container">
          <GridItem area='1/1/2/2' class="title">
            <h2>Unsere Kliniken</h2>
          </GridItem>
          <GridItem area='2/1/3/2' class="list">
            {list.map((item) => <a href={`/${item}`}>{item}</a>)}
          </GridItem>
          <GridItem area='3/1/4/2' class="copyright">
            <p>Terraconnect GmbH 	&copy; 2020 - 2023</p>
          </GridItem>
        </Grid>
      </Route>
      {list.map((item) => (
        <Route path={`/${item}`}>
          <Grid class="container">
            <GridItem area='1/1/2/2' class="title">
              <ChevronLeft width={32} height={32} onClick={back}></ChevronLeft>
              <h2>{item}</h2>
            </GridItem>
            <GridItem area='2/1/3/2' class="list">
              Info
            </GridItem>
            <GridItem area='3/1/4/2' class="copyright">
              <p>Terraconnect GmbH 	&copy; 2020 - 2023</p>
            </GridItem>
          </Grid>
        </Route>
      ))}
    </>
  );
}


export default Kliniken;