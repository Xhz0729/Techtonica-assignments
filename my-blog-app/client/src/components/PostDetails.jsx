import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [summary, setSummary] = useState(''); // State for storing the summary
  const [isSummarizing, setIsSummarizing] = useState(false); // To indicate loading state for summarizing

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

  const handleSummarize = async (e) => {
    setIsSummarizing(true); 
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/blog/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      } else {
        console.error('Error generating summary');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsSummarizing(false); // Reset loading state
    }
  };
  
  return (
    <div className='post-detail-container'>
      {postDetails ? (
        <>
          <h2>{postDetails.title}</h2>
          <p>{postDetails.details}</p>
          <img src={postDetails.image_url} alt={postDetails.title} />

          {/* Add the Summarize button */}
          <button onClick={handleSummarize} disabled={isSummarizing}>
            {isSummarizing ? 'Summarizing...' : 'Summarize'}
          </button>

          {/* Display the summary if available */}
          {summary && (
            <div>
              <h3>Summary</h3>
              <p>{summary}</p>
            </div>
          )}
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetails;
