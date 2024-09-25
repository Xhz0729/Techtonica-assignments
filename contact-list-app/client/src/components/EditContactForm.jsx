import React, { useState } from 'react';

const EditContactForm = ({ dispatch, contact, setIsEditing, ACTIONS }) => {
  const [formData, setFormData] = useState({
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone_number: contact.phone_number,
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const updatedContact = await response.json();
    // TBD: import ACTIONS to write the type as ACTIONS.UPDATE_CONTACT
    dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: updatedContact });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
   };

    return (
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
            <button type="submit">Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
    );
};

export default EditContactForm;