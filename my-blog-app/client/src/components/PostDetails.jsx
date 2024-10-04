import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/blog/post-details/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPostDetails(data);
        } else {
          console.error('Error fetching post details');
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      {postDetails ? (
        <>
          <h2>{postDetails.title}</h2>
          <p>{postDetails.details}</p>
          <img src={postDetails.image_url} alt={postDetails.title} />
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
