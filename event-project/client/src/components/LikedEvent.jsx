import React, { useContext } from 'react';
import { EventContext } from '../helper/Context';

const LikedEvent = ({ dispatch }) => {

  const {setGameState} = useContext(EventContext);
  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/events/favorite`);
      const data = await response.json();
      dispatch({ type: 'LIKED_EVENT', payload: data });
      setGameState('likedevent');
    } catch (error) {
      console.error("Error fetching liked events:", error);
    }
  };


  return (
    <div className='likedEvent'>
      <p>Click the button to display all your liked events!</p>
      <button onClick={handleClick}>Liked</button>
    </div>
  );
};

export default LikedEvent;
