import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

const AddProduct = () => {
  const history = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleAddProduct = () => {
    const productData = {
      name,
      description,
      // Add more properties as needed
    };

    axios.post('http://localhost:3001/api/v1/products/add', productData)
      .then(() => {
        history.push('/'); // Redirect to home page after successful addition
      })
      .catch(error => {
        setError(error.response.data.error); // Display error message from the server
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TextField
        label="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {/* Add more input fields for other properties */}
      <Button variant="contained" color="primary" onClick={handleAddProduct}>
        Add Product
      </Button>
    </div>
  );
};

export default AddProduct;
