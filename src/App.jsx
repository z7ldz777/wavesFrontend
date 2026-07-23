import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context Provider
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import Brands from './pages/Brands';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './components/Login';
import Checkout from './pages/Checkout'; // Fixed import path here

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col justify-between font-sans bg-white text-black">
        <div>
          {/* Global Navigation Bar (Includes Top Banner) */}
          <Navbar />

          {/* Page Routing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Fallback route */}
            <Route path="*" element={<div className="p-12 text-center text-lg font-bold">404 - Page Not Found</div>} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;