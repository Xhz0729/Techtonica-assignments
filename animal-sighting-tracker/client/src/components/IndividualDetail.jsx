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
          <img src={details[0].image_url} alt={`Image of ${details[0].common_name}`} />
          <p>
            <a href={details[0].wikipedia_url} target="_blank" rel="noopener noreferrer">
              Learn more on Wikipedia
            </a>
          </p>
          <p>Last Seen Location: {details[0].location}</p>
        </>
      )}
    </div>
  );
};

export default IndividualDetail;
