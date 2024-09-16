import React from "react";
import { useState } from "react";
import EditEventForm from './EditEventForm';

const EventCard = ({ event, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/events/${event.id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE_EVENT', payload: event.id });
  };

  const handleFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:8080/events/favorite/${event.id}`, {
        method: 'PUT',
      });
      const updatedEvent = await response.json();
      dispatch({ type: 'TOGGLE_FAVORITE', payload: event.id });
    } catch (e) {
      console.error("Failed to toggle favorite status:", e);
    }
  };
  
  return (
    <div className="eventCard">
      {isEditing ? (
        <EditEventForm event={event} dispatch={dispatch} setIsEditing={setIsEditing} />
      ) : (
        <div>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p> {/* Make sure date is valid */}
          <p className="location">{event.location}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleFavorite}>
            {event.is_favorited ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      )}
    </div>
  );
};
export default EventCard;