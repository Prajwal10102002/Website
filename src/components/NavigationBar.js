import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import axios from 'axios';

const NavigationBar = ({ isLoggedIn, isAdmin, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    axios.post('http://localhost:3001/api/v1/logout')
      .then(() => {
        onLogout();
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  const handleSearch = () => {
    axios.get(`/api/v1/products?search=${searchTerm}`)
      .then(response => {
        console.log('Search results:', response.data);
      })
      .catch(error => {
        console.error('Search error:', error);
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6">upGrad Eshop</Typography>
        </Link>
        {isLoggedIn ? (
          <React.Fragment>
            <InputBase
              placeholder="Search products..."
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body1">Home</Typography>
            </Link>
            {isAdmin && (
              <Link to="/add-products" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body1">Add Products</Typography>
              </Link>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </React.Fragment>
        ) : location.pathname !== '/login' ? (
          <React.Fragment>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body1">Login</Typography>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="body1">Sign Up</Typography>
            </Link>
          </React.Fragment>
        ) : null}
        <ShoppingCart />
      </Toolbar>
    </AppBar>
  );
  
};

export default NavigationBar;