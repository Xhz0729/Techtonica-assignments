import React from 'react'
import { Link } from 'react-router-dom';

const SightingCard = ({sighting, dispatch}) => {
  return (
    <div className='card'>
        <h3>Nickname: {sighting.nickname}</h3>
        <p>Species: {sighting.species}</p>
        <p>Recent Sighting Date: {new Date(sighting.recent_sighting).toLocaleDateString()}</p>
        <p>Recent Sighting Location: {sighting.recent_sighting_location} </p>
        <p>Sighting Count: {sighting.sightings_count}</p>

        {/* Link to the individual detail page */}
        <Link to={`/individuals/${sighting.id}`}>
          View Details
        </Link>
    </div>
  )
}

export default SightingCard