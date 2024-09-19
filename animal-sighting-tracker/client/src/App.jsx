import './App.css'
import { useReducer, useEffect } from 'react';
import SightingList from './components/SightingList.jsx';
import AddSightingForm from './components/AddSightingForm.jsx';
import SearchSightings from './components/SearchSightings.jsx';

const ACTIONS = {
  SET_SIGHTINGS: "set_sightings",

  ADD_SIGHTING: "add_sighting",

  SEARCH_SIGHTINGS:"search_sightings"
  
}

const animalsReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_SIGHTINGS:
      return action.payload;
    case ACTIONS.ADD_SIGHTING:
      return [...state, action.payload];
    case ACTIONS.SEARCH_SIGHTINGS:
      return action.payload;
    default:
      return state;
  }
}
function App() {
  const [sightings, dispatch] = useReducer(animalsReducer, []);

  useEffect(() => {
    // Fetch initial list of sightings from the backend
    const fetchSightings = async () => {
      try{
        const response = await fetch('http://localhost:8080/animals/sightings');
        if(!response.ok) {
          throw new Error('Failed to fetch sightings');
        }
        const data = await response.json();
        dispatch({ type: ACTIONS.SET_SIGHTINGS, payload: data });
     } catch (error) {
      console.error('Error fetching sightings:', error.message);
     }
    }
    fetchSightings();
  }, []);

  return (
    <>
      <div>
        <h1>Show sightings</h1>
        <AddSightingForm dispatch={dispatch} />
        <SightingList sightings={sightings} dispatch={dispatch} />
        <SearchSightings dispatch={dispatch} />
      </div>
    </>
  )
}

export default App
