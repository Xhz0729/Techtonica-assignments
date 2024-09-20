import React from 'react'
import { Link } from 'react-router-dom';

const SightingCard = ({sighting, dispatch}) => {
  return (
    <div>
        <h3>Nickname: {sighting.nickname}</h3>
        <p>Sighting Location: {sighting.location}</p>
        <p>Sighting Date: {new Date(sighting.sighting_date).toLocaleDateString()}</p>


        {/* Link to the individual detail page */}
        <Link to={`/individuals/${sighting.individual_id}`}>
          View Details
        </Link>
    </div>
  )
}

export default SightingCard