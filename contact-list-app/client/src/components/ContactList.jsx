import React from 'react'
import ContactCard from './ContactCard';

const ContactList = ({contacts, dispatch, ACTIONS}) => {
  return (
    <div>
        {contacts.length > 0 ? (
            contacts.map(contact => (
            <ContactCard key={contact.id} contact = {contact} dispatch={dispatch} ACTIONS={ACTIONS} />
            ))
        ) : (
            <p>No contacts available</p>
        )}
    </div>
  );
}

export default ContactList