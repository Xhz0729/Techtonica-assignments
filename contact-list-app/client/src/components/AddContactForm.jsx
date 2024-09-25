import React from 'react'
import { useState } from 'react';

const AddContactForm = ({ dispatch, ACTIONS }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
      });

    const [error, setError] = useState(''); // state for error messages

    const handleSubmit = async e => {
        e.preventDefault();
        setError(''); // reset the error before new submission
        try {
          const response = await fetch('http://localhost:8080/contacts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add sighting');
          }
    
          const newContact = await response.json();
          dispatch({ type: ACTIONS.ADD_CONTACT, payload: newContact });

          // Clear form fields after successful submission
          setFormData ({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: ''
          });
        } catch(e) {
            setError(e.message);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    }; 
    return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='first_name'
                placeholder='First Name'
                value={formData.first_name}
                onChange={handleChange}
                 required // Ensure this field is filled
            />

            <input
                type='text'
                name='last_name'
                placeholder='Last Name'
                value={formData.last_name}
                onChange={handleChange}
                required // Ensure this field is filled
            />

            <input
                type='email'
                placeholder='Contact Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type='text'
                placeholder='Phone Number'
                name='phone_number'
                value={formData.phone_number}
                onChange={handleChange}
            />

            <button type='submit'>Add Sighting</button>

        </form>

        {/* Display error message if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
export default AddContactForm