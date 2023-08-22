import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomAppBar from './components/CustomAppBar';
import Home from './pages/Home';
import Login from './pages/Login1';
import Signup from './pages/Signup1';
import AddProducts from './pages/AddProducts';
import ProductPage from './pages/ProductPage1';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrderPlacementPage from './pages/OrderPlacementPage';
import { AuthProvider, useAuth } from './components/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CustomAppBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/order-placement/:productId" element={<OrderPlacementPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
