import React from 'react';
import { AppBar, Toolbar, Typography, Button, Input } from '@mui/material';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const CustomAppBar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Upgrad Ecom
        </Typography>
        {user.isAuthenticated ? (
          <>
            <Input type="text" placeholder="Search" />
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            {user.isAdmin && (
              <Button component={Link} to="/add-products" color="inherit">
                Add Product
              </Button>
            )}
            <Typography variant="body1" sx={{ margin: '0 1rem' }}>
              Welcome, {user.name}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/signup" color="inherit">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
