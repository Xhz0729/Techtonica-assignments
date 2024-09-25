import React from 'react'
import { Link } from 'react-router-dom';

const ContactCard = ({contact, dispatch}) => {
  return (
    <div className='card'>
        <p>First Name: {contact.first_name}</p>
        <p>Last Name: {contact.last_name}</p>
        <p>Email: {contact.email}</p>
        <p>Phone Number: {contact.phone_number} </p>

        {/* Link to the contact detail page */}
        <Link to={`/${contact.id}`}>
          View Details
        </Link>
    </div>
  )
}

export default ContactCard