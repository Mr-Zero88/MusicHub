import * as TerraconnectUI from 'terraconnect-ui';
import { createState, Modified, State, Value } from 'terraconnect-state';
import Grid from 'Components/UI/Grid/Grid';
import GridItem from 'Components/UI/Grid/GridItem';
import Route from 'Components/Router/Route';
import RouteNotFound from 'Components/Router/RouteNotFound';
import Router, { path, back } from 'Components/Router/Router';
import ChevronLeft from 'Icons/chevron-left';
import Markdown from './Markdown';
import './kliniken.scss';
import Doctor from 'Icons/Doctor';

const Clinicen = () => {
  let clinics = createState<Array<Clinic>>(JSON.parse(localStorage.getItem('clinic') ?? '[]'));
  fetch(`https://api.${window.location.host.split('.')[0]}.terraconnect.de/clinics`).then(data => data.json()).then(async (data) => {
    localStorage.setItem('clinic', JSON.stringify(data));
    clinics[Value] = data;
  });

  let cache: Map<string, TerraconnectUI.children> = new Map;
  let content = createState((clinics) => (
    <Router>
      <Route path="/" component={ClinicenList} list={{ clinics }} />
      {clinics.map((clinic) => {
        if (!cache.has(clinic.name))
          cache.set(clinic.name, (<Route path={"/" + clinic.name} component={Clinic} id={clinic.id} />));
        return cache.get(clinic.name);
      })}
      <RouteNotFound>
        <h1>"{createState((path: string) => path.slice(1, -1), [path])}" 404 Not Found</h1>
      </RouteNotFound>
    </Router>
  ) as TerraconnectUI.HTMLComponent<any>, [clinics]);

  content[Modified].on((a, b) => {
    let parent = b.parentNode;
    b.remove();
    parent?.append(a);
  });
  return (
    content
    // <>
    //   <Route path="/" component={ClinicenList} list={{ clinics }} />
    //   {clinics.map[Value]((clinic) => (<Route path={"/" + clinic.name} component={Clinic} Clinic={clinic} />))}
    // </>
    // <>
    //   <Route path="/" component={() => (<div>
    //     {clinics.map[Value]((_) => (<div>{_.name}</div>))}
    //   </div>)} />
    // </>
  );
}


interface Hospital {
  id: number;
  logo: string;
  name: string;
  title: string;
  info: string;
  street: string;
  housenumber: string;
  plz: string;
  place: string;
  phone: string;
  fax: string;
  mail: string;
  url: string;
};

interface Contact {
  description: string;
  street: string;
  housenumber: string;
  plz: string;
  place: string;
  phone: string;
  fax: string;
  mail: string;
  url: string;
};

interface Leader {
  id: number;
  title: string;
  forename: string;
  surname: string;
  picture: string;
  section: string;
  function: string;
  contact: Contact;
};

interface ClinicHead {
  leaders: Array<Leader>;
  // blockinfo: string;
  // blockqualification: boolean,
  // qualification: string,
  // blockfunction: boolean,
  // function: string,
};

interface Service {
  text: string;
}

interface Clinic {
  id: number;
  isCenter: boolean;
  name: string;
  text: string;
  title: string;
  url?: string;
  head?: ClinicHead;
  contact?: Contact;
  services?: Array<Service>;
};

type ClinicenListProps = {
  list: {
    clinics: Array<Clinic>
  }
};

const ClinicenList: TerraconnectUI.ComponentFN<ClinicenListProps> = ({ list }) => {
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

type ClinicProps = {
  id: number;
};

const Clinic: TerraconnectUI.ComponentFN<ClinicProps> = ({ id }) => {
  let clinic = createState<Clinic>({ head: undefined, id: id as unknown as number, isCenter: false, name: "", text: "", url: "", title: "" });
  fetch(`https://api.${window.location.host.split('.')[0]}.terraconnect.de/clinic/${id}`).then(async (data) => {
    let json = await data.json();
    clinic[Value] = json;
  });

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
              {clinic.head.leaders.map(leader => (
                <div className="clinic-head-leader">
                  <div className="clinic-head-leader-picture">
                    {leader.picture != null ? (
                      <img src={`https://api.${window.location.host.split('.')[0]}.terraconnect.de${leader.picture}`}></img>
                    ) : (
                      <div className="no-image">
                        {/* No Image */}
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
          {clinic.contact != null ? (
            <div className="clinic-contact">
              <h2>Kontakt</h2>
              <p>
                <span>{clinic.contact.description.split('\n').map((_, i) => (<span>{i != 0 ? <br /> : null}{_}</span>))}</span><br />
                <a className="link-noline" href={`http://maps.google.com/maps?q=${clinic.contact.street} ${clinic.contact.housenumber}, ${clinic.contact.plz} ${clinic.contact.place}`} target="_blank">
                  <span>{clinic.contact.street} {clinic.contact.housenumber}</span><br />
                  <span>{clinic.contact.plz} {clinic.contact.place}</span>
                </a>
                {clinic.contact.phone != null ? (
                  <span>
                    <br />
                    <span>Tel: <a href={`tel:${clinic.contact.phone}`}>{clinic.contact.phone}</a></span>
                  </span>
                ) : null}
                {clinic.contact.fax != null ? (
                  <span>
                    <br />
                    <span>Fax: <a href={`tel:${clinic.contact.fax}`}>{clinic.contact.fax}</a></span>
                  </span>
                ) : null}
                {clinic.contact.mail != null ? (
                  <span>
                    <br />
                    <span>Mail: <a href={`mailto:${clinic.contact.mail}`}>{clinic.contact.mail}</a></span>
                  </span>
                ) : null}
              </p>
            </div>
          ) : null}
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

export default Clinicen;