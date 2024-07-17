import { getClinic } from 'API';
import { Clinic } from 'API/types';
import { back } from 'Components/Router/Router';
import Grid from 'Components/UI/Grid/Grid';
import GridItem from 'Components/UI/Grid/GridItem';
import ChevronLeft from 'Icons/chevron-left';
import Doctor from 'Icons/Doctor';
import { createState, isState, Modified, Value } from 'terraconnect-state';
import * as TerraconnectUI from 'terraconnect-ui';
import Markdown from './Markdown';
import ContactSection from './ContactSection';
export type ClinicInfoProps = {
  id: number;
};

const ClinicInfo: TerraconnectUI.ComponentFN<ClinicInfoProps> = ({ id }) => {
  id = isState(id) ? id[Value] : id;
  let clinic = getClinic(id);
  let content = createState((clinic: Clinic) => {
    return (
      <Grid class="container">
        <GridItem area='1/1/2/2' class="title">
          <ChevronLeft width={32} height={32} onClick={back}></ChevronLeft>
          <h2>{clinic.title}</h2>
        </GridItem>
        <GridItem area='2/1/3/2' class="list">
          {clinic.head != null && clinic.head.leaders.length != 0 ? (
            <div className="clinic-head">
              {clinic.head?.leaders.map(leader => (
                <div className="clinic-head-leader">
                  <div className="clinic-head-leader-picture">
                    {leader.picture != null ? (
                      <img src={`https://api.${window.location.host.split('.')[0]}.terraconnect.de${leader.picture}`}></img>
                    ) : (
                      <div className="no-image">
                        <Doctor></Doctor>
                      </div>
                    )}
                  </div>
                  <div className="clinic-head-leader-info">
                    <span>
                      {leader.function != null ? (
                        <span>{leader.function}<br /></span>
                      ) : null}
                      <strong>
                        <span>{leader.title}</span>
                        &nbsp;
                        <span>{leader.forename} {leader.surname}</span>
                      </strong>
                      {leader.section ? (
                        <span>
                          <br />
                          <span>({leader.section})</span>
                        </ span>
                      ) : null}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="clinic-info">
            <h2>Info</h2>
            <Markdown content={clinic.text}></Markdown>
          </div>
          <div className="clinic-points">
            <h2>Schwerpunkte</h2>
            <ul>
              {clinic.services?.map(({ text }) => (
                <li>{text}</li>
              ))}
            </ul>
          </div>
          {clinic.contact != null ? ContactSection.bind(null as any)({ contact: clinic.contact }) : null}
          <div className="leaders-contact">
            {clinic.head?.leaders.filter(leader => leader.contact != null).map(leader => (
              ContactSection.bind(null as any)({ contact: leader.contact, suffix: `${leader.title} ${leader.forename} ${leader.surname}` })
            ))}
          </div>
        </GridItem>
        <GridItem area='3/1/4/2' class="copyright">
          <p>terraconnect GmbH 	&copy; 2020 - 2024</p>
        </GridItem>
      </Grid>
    ) as TerraconnectUI.HTMLComponent<any>;
  }, [clinic]);

  content[Modified].on((a, b) => {
    let parent = b.parentNode;
    b.remove();
    parent?.append(a);
  });

  return content;
}

export default ClinicInfo;