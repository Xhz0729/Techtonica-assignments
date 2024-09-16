import React, { useState } from 'react';

const EditEventForm = ({ event, dispatch, setIsEditing }) => {
  const [formData, setFormData] = useState({
    name: event.name,
    description: event.description,
    date: event.date,
    location: event.location,
    is_favorited: event.is_favorited
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const updatedEvent = await response.json();
    dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent });
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
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
        value={formData.location}
        onChange={e => setFormData({ ...formData, location: e.target.value })}
      />
      <button type="submit">Save Changes</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditEventForm;