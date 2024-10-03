import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/blog/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // Clear form fields after successful submission
      setFormData ({
        username: '', 
        email: '', 
        password: ''
      });
    } catch (error) {
        console.error('Registration error:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
