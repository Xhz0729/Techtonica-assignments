import React, { useState } from 'react';

const AddEventForm = ({ dispatch }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    is_favorited: false
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const newEvent = await response.json();
    dispatch({ type: 'ADD_EVENT', payload: newEvent });
    setFormData({ name: '', description: '', date: '', location: '', is_favorited: false }); // Reset form
  };

  return (
    <div className='addEventForm'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value })}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEventForm;
