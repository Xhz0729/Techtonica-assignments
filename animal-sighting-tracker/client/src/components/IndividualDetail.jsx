import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const IndividualDetail = () => {
  const { id } = useParams();  // get individual ID from the URL
  const [details, setDetails] = useState(null);  // store the fetched details
  const [error, setError] = useState(null);  // Handle any errors

  useEffect(() => {
    const fetchIndividualDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/animals/individuals/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch individual details');
        }
        const data = await response.json();
        console.log(data); 
        setDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchIndividualDetails();
  }, [id]);  // fetch when the individual ID changes

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Individual Details</h2>
      {details && (
        <>
          <p>Nickname: {details[0].nickname}</p>
          <p>Species: {details[0].common_name}</p>
          <p>Scientific Name: {details[0].scientific_name}</p>
          <p>Estimated Population: {details[0].estimated_population}</p>
          <p>Conservation Status: {details[0].conservation_state_code}</p>
          <img src={details[0].image_url} alt={`Image of ${details[0].common_name}`} />
          <p>
            <a href={details[0].wikipedia_url} target="_blank" rel="noopener noreferrer">
              Learn more on Wikipedia
            </a>
          </p>
          <p>First Sighting Date: {new Date(details[0].first_sighting).toLocaleDateString()}</p>
          <p>First Sighting Location: {details[0].first_sighting_location}</p>
          <p>Recent Sighting Date: {new Date(details[0].recent_sighting).toLocaleDateString()}</p>
          <p>Recent Sighting Location: {details[0].recent_sighting_location}</p>
          <p>Total Sightings: {details[0].sightings_count}</p>
        </>
      )}
    </div>
  );
};

export default IndividualDetail;
