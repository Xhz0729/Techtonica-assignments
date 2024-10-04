import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/blog/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is ok (status 200-299)
      if (response.ok) {
        const data = await response.json(); // Parse the JSON data
        const user = data.user; // Access the user info from the response
  
        // Save user info in localStorage or state
        localStorage.setItem('loggedInUser', JSON.stringify(user));
  
        // Clear form fields after successful submission
        setFormData({
          email: '',
          password: '',
        });
  
        navigate('/posts'); // Navigate to posts page after login
      } else {
        // Handle errors if the response is not ok
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.'); // Catch unexpected errors
      console.error('An unexpected error occurred:', error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
