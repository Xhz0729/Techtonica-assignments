import React from 'react'
import ContactCard from './ContactCard';

const ContactList = ({contacts, dispatch}) => {
  return (
    <div>
        {contacts.length > 0 ? (
            contacts.map(contact => (
            <ContactCard key={contact.id} contact = {contact} dispatch={dispatch} />
            ))
        ) : (
            <p>No contacts available</p>
        )}
    </div>
  );
}

export default ContactList