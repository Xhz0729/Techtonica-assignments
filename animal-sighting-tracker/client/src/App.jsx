import './App.css'
import { useReducer, useEffect } from 'react';
import SightingList from './components/SightingList.jsx';

const ACTIONS = {
  SET_SIGHTINGS: "set_sightings"
}

const animalsReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_SIGHTINGS:
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
      const response = await fetch('http://localhost:8080/animals/sightings');
      const data = await response.json();
      dispatch({ type: ACTIONS.SET_SIGHTINGS, payload: data });
    };
    fetchSightings();
  }, []);

  return (
    <>
      <div>
        <h1>Show sightings</h1>
        <SightingList sightings={sightings} dispatch={dispatch} />
      </div>
    </>
  )
}

export default App
