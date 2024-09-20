import React, { useState } from 'react';

const AddSightingForm = ({ dispatch, ACTIONS }) => {
  const [formData, setFormData] = useState({
    sighting_date: '',
    individual_id: '',
    location: '',
    is_healthy: '',
    sighter_email: ''  
  });

  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); // Reset the error before new submission
    try {
      const response = await fetch('http://localhost:8080/animals/sightings', {
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

      const newSighting = await response.json();
      dispatch({ type: ACTIONS.ADD_SIGHTING, payload: newSighting });

      // Clear form fields after successful submission
      setFormData({
        sighting_date: '',
        individual_id: '',
        location: '',
        is_healthy: '',
        sighter_email: ''
      });
    } catch (err) {
      setError(err.message); // Set error message if the POST request fails
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='date'
          name='sighting_date'
          placeholder='Sighting Date'
          value={formData.sighting_date}
          onChange={handleChange}
          required // Ensure this field is filled
        />

        <input
          type='number'
          name='individual_id'
          placeholder='Individual ID'
          value={formData.individual_id}
          onChange={handleChange}
          required
          min="1" // ID should be a positive number
        />

        <input
          type='text'
          name='location'
          placeholder='Location'
          value={formData.location}
          onChange={handleChange}
          required // Ensure location is filled in
        />

        <select
          name="is_healthy"
          value={formData.is_healthy}
          onChange={handleChange}
        >
          <option value="">Is Healthy?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <input
          type='email'
          placeholder='sighter email'
          name='sighter_email'
          value={formData.sighter_email}
          onChange={handleChange}
        />

        <button type='submit'>Add Sighting</button>
      </form>

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddSightingForm;