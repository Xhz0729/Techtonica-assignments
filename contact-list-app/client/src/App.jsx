import './App.css'
import { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactList from './components/ContactList';
import AddContactForm from './components/AddContactForm';
import ContactDetails from './components/ContactDetails';

const ACTIONS = {
  SET_CONTACTS: "set_contact",

  ADD_CONTACT: "add_contact",

  DELETE_CONTACT: "delete_contact",

  UPDATE_CONTACT:"update_contact"
}

const contactReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
      return action.payload;
    case ACTIONS.ADD_CONTACT:
      return [...state, action.payload];
    case ACTIONS.DELETE_CONTACT:
      return state.filter(contact => contact.id !== action.payload);
    case ACTIONS.UPDATE_CONTACT:
      return state.map(contact => contact.id === action.payload.id ? action.payload : contact);
    default:
      return state;
  }
};

function App() {

  const [state, dispatch] = useReducer(contactReducer, []);

  useEffect(() => {
    // Fetch contact basic from the backend
    const fetchSightings = async () => {
      try{
        const response = await fetch('http://localhost:8080/contacts');
        if(!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        dispatch({ type: ACTIONS.SET_CONTACTS, payload: data });
     } catch (error) {
      console.error('Error fetching contacts:', error.message);
     }
    }
    fetchSightings();
  }, []);
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route  path="/" element= {
            <>
              <h1>Show Contacts</h1>
              <AddContactForm dispatch={dispatch} ACTIONS={ACTIONS} />
              <ContactList contacts={state} dispatch={dispatch} ACTIONS={ACTIONS} />
            </>
          }
          />

          {/* Route for search results */}
          <Route path="/:id" element={<ContactDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
