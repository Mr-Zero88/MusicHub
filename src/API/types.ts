export interface Hospital {
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

export interface Contact {
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

export interface Leader {
  id: number;
  title: string;
  forename: string;
  surname: string;
  picture: string;
  section: string;
  function: string;
  contact: Contact;
};

export interface ClinicHead {
  leaders: Array<Leader>;
  // blockinfo: string;
  // blockqualification: boolean,
  // qualification: string,
  // blockfunction: boolean,
  // function: string,
};

export interface Service {
  text: string;
}

export interface Clinic {
  id: number;
  isCenter?: boolean;
  name?: string;
  text?: string;
  title?: string;
  url?: string;
  head?: ClinicHead;
  contact?: Contact;
  services?: Array<Service>;
};