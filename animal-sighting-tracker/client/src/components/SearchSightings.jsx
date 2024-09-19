import React, { useState } from 'react';

const SearchSightings = ({ dispatch }) => {
  // state to store the start and end dates
  const [searchDate, setSearchDate] = useState({
    start_date: '',
    end_date: ''
  });

  // handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // make a get request to the backend with the search dates
      const response = await fetch(`http://localhost:8080/animals/sightings/search?start_date=${searchDate.start_date}&end_date=${searchDate.end_date}`);
      const data = await response.json();

      // dispatch the search results to the reducer
      dispatch({ type: 'search_sightings', payload: data });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setSearchDate(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='date'
          name='start_date'    // set a name attribute for easy state management
          placeholder='Start Date'
          value={searchDate.start_date}
          onChange={handleChange}
          required  // ensure start date is required
        />
        <input
          type='date'
          name='end_date'      // set a name attribute for easy state management
          placeholder='End Date'
          value={searchDate.end_date}
          onChange={handleChange}
          required  // ensure end date is required
        />
        <button type='submit'>Search Sightings</button> 
      </form>
    </div>
  );
};

export default SearchSightings;
