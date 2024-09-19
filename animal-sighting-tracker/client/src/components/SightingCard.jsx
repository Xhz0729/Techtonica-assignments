import React from 'react'

const SightingCard = ({sighting, dispatch}) => {

  return (
    <div>
        <h3>Nickname: {sighting.nickname}</h3>
        <p>Sighting Location: {sighting.location}</p>
        <p>Sighting Date: {new Date(sighting.sighting_date).toLocaleDateString()}</p>
    </div>
  )
}

export default SightingCard