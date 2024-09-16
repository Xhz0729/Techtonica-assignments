import React, { useContext } from 'react'
import { EventContext } from '../helper/Context'

const BackToHomepage = ({ dispatch }) => {
    const {setGameState} = useContext(EventContext);

    const handleClick = async () => {
        try {
          const response = await fetch(`http://localhost:8080/events`);
          const data = await response.json();
          dispatch({ type: 'SET_EVENTS', payload: data });
          setGameState('menu');
        } catch (error) {
          console.error("Error fetching liked events:", error);
        }
      };
  return (
    <div>
        <button onClick={handleClick} className='backBtn'>Homepage</button>
    </div>
  )
}

export default BackToHomepage