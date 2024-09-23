import './App.css'
import { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import SightingList from './components/SightingList.jsx';
import AddSightingForm from './components/AddSightingForm.jsx';
import SearchSightings from './components/SearchSightings.jsx';
import IndividualDetail from './components/IndividualDetail.jsx';

const ACTIONS = {
  SET_SIGHTINGS: "set_sightings",

  ADD_SIGHTING: "add_sighting",

  SEARCH_SIGHTINGS:"search_sightings",

  RESET_SIGHTING: 'reset_sightings'
}

const initialState = {
  sightings: [],
  allSightings: [], // to store the full list of sightings
};


const animalsReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_SIGHTINGS:
      return {
        ...state,
        allSightings: action.payload,
        sightings: action.payload
      };
    case ACTIONS.ADD_SIGHTING:
      return {
        ...state,
        sightings:[...state.sightings, action.payload],
        allSightings:[...state.allSightings, action.payload]
      }
    case ACTIONS.SEARCH_SIGHTINGS:
      return {
        ...state,
        sightings:action.payload
      }
    case ACTIONS.RESET_SIGHTING:
      return {
        ...state,
        sightings: state.allSightings, // reset to the full list when going back to homepage
      };
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(animalsReducer, initialState);

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
    <Router>
      <div>
        <Routes>
          <Route  path="/" element= {
            <>
              <h1>Show sightings</h1>
              <AddSightingForm dispatch={dispatch} ACTIONS={ACTIONS} />
              <SightingList sightings={state.allSightings} dispatch={dispatch} />
              <SearchSightings dispatch={dispatch} ACTIONS={ACTIONS} />
            </>
          }
          />

          {/* Route for search results */}
          <Route path="/search" element={<SightingList sightings={state.sightings} dispatch={dispatch} />} />

          {/* Add route for individual detail */}
          <Route path="/individuals/:id" element={<IndividualDetail />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App
