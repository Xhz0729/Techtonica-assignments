import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EditContactForm from './EditContactForm';

const ContactCard = ({contact, dispatch, ACTIONS}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8080/contacts/${contact.id}`, { method: 'DELETE' });
    if (response.ok) {
      console.log('Deleted successfully:', contact.id);  // Confirm deletion
      dispatch({ type: ACTIONS.DELETE_CONTACT, payload: contact.id });
    } else {
      console.error('Failed to delete contact');
    }
  };
  

  return (
    <div className='card'>
        {isEditing ? (<EditContactForm contact={contact} dispatch={dispatch} setIsEditing={setIsEditing} ACTIONS={ACTIONS} />

        ) : (
            <div>
                <p>First Name: {contact.first_name}</p>
                <p>Last Name: {contact.last_name}</p>
                <p>Email: {contact.email}</p>
                <p>Phone Number: {contact.phone_number} </p>
                {/* Link to the contact detail page */}
                <Link to={`/${contact.id}`}>
                    View Details
                </Link>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        )}
    </div>
  );
};

export default ContactCard