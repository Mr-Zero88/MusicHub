import * as TerraconnectUI from 'terraconnect-ui';
import Grid from '../../Components/UI/Grid/Grid';
import './login.scss';
import GridItem from '../../Components/UI/Grid/GridItem';
const Login: TerraconnectUI.Component = () => {
  return (
    <Grid class="container">
      <GridItem area='1/1/2/2' class="icon">
        <img src="https://www.mvec.net/wp-content/uploads/2011/10/SmartHublogpurple1.png" />
      </GridItem>
      <GridItem area='2/1/3/2' class="login">
        <Grid class="container">
          <GridItem area='1/1/2/2' class="title">
            Login
          </GridItem>
          <GridItem area='2/1/2/2' class="qr">
            <img src="https://svgshare.com/i/10Ut.svg"></img>
            <p>Scan the QR-Code to Login</p>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem area='3/1/4/2' class="copyright">
        <p>SmartHUB GmbH 	&copy;2020 - 2023</p>
      </GridItem>
    </Grid>
  );
}

export default Login;