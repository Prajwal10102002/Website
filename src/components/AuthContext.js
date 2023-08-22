import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        isAuthenticated: false,
        isAdmin: false,
      });
  const updateUser = (userData) => {
    setUser(userData);
  };

  const login = () => {
    // Your login logic here
    // For example, fetch user data from API and then call updateUser
    const userData = { name: 'John Doe', email: 'john@example.com', isAuthenticated: true, isAdmin: false };
    updateUser(userData);
  };

  const logout = () => {
    // Your logout logic here
    updateUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
