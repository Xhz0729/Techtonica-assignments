import React from 'react'
import SightingCard from './SightingCard'

const SightingList = ({sightings, dispatch}) => {
  return (
    <div>
        {sightings.length > 0 ? (
            sightings.map(sighting => (
            <SightingCard key={sighting.id} sighting = {sighting} dispatch={dispatch} />
            ))
        ) : (
            <p>No sightings avaliable</p>
        )}
    </div>
  );
}

export default SightingList