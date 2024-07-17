import { Contact } from "API/types";
import { isState, Value } from "terraconnect-state";
import { ComponentFN } from "terraconnect-ui/*";

export type ContactProps = {
  contact: Contact;
  suffix?: string | null;
};

const ContactSection: ComponentFN<ContactProps> = ({ contact, suffix }) => {
  contact = isState(contact) ? contact[Value] : contact;
  return (
    <div className="clinic-contact">
      {suffix == null ? <h2>Kontakt</h2> : null}
      {suffix != null ? <h3>{" " + suffix}</h3> : null}
      <p>
        <span>{contact.description.split('\n').map((_, i) => (<span>{i != 0 ? <br /> : null}{_}</span>))}</span><br />
        <a className="link-noline" href={`http://maps.google.com/maps?q=${contact.street} ${contact.housenumber}, ${contact.plz} ${contact.place}`} target="_blank">
          <span>{contact.street} {contact.housenumber}</span><br />
          <span>{contact.plz} {contact.place}</span>
        </a>
        {contact.phone != null ? (
          <span>
            <br />
            <span>Tel: <a href={`tel:${contact.phone}`}>{contact.phone}</a></span>
          </span>
        ) : null}
        {contact.fax != null ? (
          <span>
            <br />
            <span>Fax: <a href={`tel:${contact.fax}`}>{contact.fax}</a></span>
          </span>
        ) : null}
        {contact.mail != null ? (
          <span>
            <br />
            <span>Mail: <a href={`mailto:${contact.mail}`}>{contact.mail}</a></span>
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default ContactSection;