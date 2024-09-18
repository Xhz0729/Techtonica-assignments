import React from 'react'

const SightingCard = ({sighting, dispatch}) => {

  return (
    <div>
        <h3>{sighting.nickname}</h3>
        <p>{sighting.location}</p>
        <p>{sighting.sighting_date}</p>
    </div>
  )
}

export default SightingCard