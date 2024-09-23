import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';  

const SearchSightings = ({ dispatch, ACTIONS }) => {
  // state to store the start and end dates
  const [searchDate, setSearchDate] = useState({
    start_date: '',
    end_date: ''
  });

  const navigate = useNavigate();  // initialize navigation
  const location = useLocation(); 

  // handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // make a get request to the backend with the search dates
      const response = await fetch(`http://localhost:8080/animals/sightings/search?start_date=${searchDate.start_date}&end_date=${searchDate.end_date}`);
      const data = await response.json();

      // dispatch the search results to the reducer
      dispatch({ type:ACTIONS.SEARCH_SIGHTINGS, payload: data });

      // programmatically navigate to the search results page
      navigate('/search');
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

  // effect to reset the sightings list when the user navigates back to the homepage
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch({ type: ACTIONS.RESET_SIGHTINGS });
    }
  }, [location, dispatch]);

  return (
    <div className='search-container'>
      <form onSubmit={handleSubmit}>
      <label htmlFor="start_date">Start Date</label>
        <input
          type='date'
          name='start_date'    // set a name attribute for easy state management
          id='start_date'
          placeholder='Start Date'
          value={searchDate.start_date}
          onChange={handleChange}
          required  // ensure start date is required
        />
        <label htmlFor="end_date">End Date</label>
        <input
          type='date'
          name='end_date'      // set a name attribute for easy state management
          id='end_date'
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
