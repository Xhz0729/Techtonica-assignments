import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, dispatch }) => {
  return (
    <div>
      {events.length > 0 ? (
        events.map(event => (
          <EventCard key={event.id} event={event} dispatch={dispatch} />
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default EventList;
