import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Use backticks for template literal
        const response = await fetch(`http://localhost:8080/blog/posts/${loggedInUser.id}`);

        if (response.ok) {
          const data = await response.json(); // Parse the response as JSON
          setPosts(data);
        } else {
          console.error('Error fetching posts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [loggedInUser]);

  const handleViewDetails = (postId) => {
    navigate(`/post-details/${postId}`);
  };

  return (
    <div>
      <h2>You're logged in as {loggedInUser.username}</h2>
      <h3>Your Posts</h3>
      {posts.length === 0 ? (
        <p>You haven't made any posts yet.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <button onClick={() => handleViewDetails(post.id)}>View Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
