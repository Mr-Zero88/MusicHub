import { Contact } from "API/types";
import { isState, Value } from "terraconnect-state";
import { Component, ComponentFN } from "terraconnect-ui";

export type ContactProps = {
  contact: Contact;
  suffix?: string | null;
};

const ContactSection: ComponentFN<ContactProps> = ({ contact, suffix }) => {
  let _contact = isState(contact) ? contact[Value] : contact;
  return (
    <div className="clinic-contact">
      {suffix == null ? <h2>Kontakt</h2> : null}
      {suffix != null ? <h3>{" " + suffix}</h3> : null}
      <p>
        <span>{_contact.description.split('\n').map((_, i) => (<span>{i != 0 ? <br /> : null}{_}</span>))}</span><br />
        <a className="link-noline" href={`http://maps.google.com/maps?q=${_contact.street} ${_contact.housenumber}, ${_contact.plz} ${_contact.place}`} target="_blank">
          <span>{_contact.street} {_contact.housenumber}</span><br />
          <span>{_contact.plz} {_contact.place}</span>
        </a>
        {_contact.phone != null ? (
          <span>
            <br />
            <span>Tel: <a href={`tel:${_contact.phone}`}>{_contact.phone}</a></span>
          </span>
        ) : null}
        {_contact.fax != null ? (
          <span>
            <br />
            <span>Fax: <a href={`tel:${_contact.fax}`}>{_contact.fax}</a></span>
          </span>
        ) : null}
        {_contact.mail != null ? (
          <span>
            <br />
            <span>Mail: <a href={`mailto:${_contact.mail}`}>{_contact.mail}</a></span>
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default ContactSection as Component<ContactProps>;