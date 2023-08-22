import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: ''
  });
  const [error, setError] = useState('');

  const handleSignup = () => {
    axios.post('http://localhost:3001/api/v1/users', userData)
      .then(() => {
        navigate('/login'); // Redirect to login page after successful signup
      })
      .catch(error => {
        // Handle signup error
        if (error.response && error.response.data) {
          setError(error.response.data.error); // Display error message from the server
        } else {
          setError('An error occurred during signup.');
        }
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <TextField
        label="First Name"
        name="firstName"
        value={userData.firstName}
        onChange={handleChange}
      /><br />
      <TextField
        label="Last Name"
        name="lastName"
        value={userData.lastName}
        onChange={handleChange}
      /><br />
      <TextField
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      /><br />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
      /><br />
      <TextField
        label="Contact Number"
        name="contactNumber"
        value={userData.contactNumber}
        onChange={handleChange}
      /><br /><br />
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
