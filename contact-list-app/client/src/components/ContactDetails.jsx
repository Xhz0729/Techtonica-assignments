import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ContactDetails = () => {
  const { id } = useParams();  // get contact ID from the URL
  const [details, setDetails] = useState(null);  // store the fetched details
  const [error, setError] = useState(null);  // handle any errors

  useEffect(() => {
    const fetchContactDetailss = async () => {
      try {
        const response = await fetch(`http://localhost:8080/contacts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch contact details');
        }
        const data = await response.json();
        console.log(data); 
        setDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchContactDetailss();
  }, [id]);  // fetch when the contact ID changes

  if (error) return <p>Error: {error}</p>;

  return (
    <div className='details'>
      <h2>Contact Details</h2>
      {details && (
        <>
          <p>First Name: {details[0].first_name}</p>
          <p>Last Name: {details[0].last_name}</p>
          <p>Email: {details[0].email}</p>
          <p>Phone Number: {details[0].phone_number}</p>
          <p>Address: {details[0].street + ', ' + details[0].city + ', ' + details[0].state + ' ' + details[0].zip_code}</p>
          <p>Notes: {details[0].notes}</p>
        </>
      )}
    </div>
  );
};

export default ContactDetails;