import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
