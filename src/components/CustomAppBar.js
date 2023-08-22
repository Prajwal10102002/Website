import React from 'react';
import { AppBar, Toolbar, Typography, Button, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

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
            {/* Other menu items */}
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
