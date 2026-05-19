import React, { useState, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroBanner from './pages/HeroBanner';
import ProductList from './pages/ProductList';
import Footer from './components/Footer';
import ContactForm from './pages/ContactForm';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/Cart';
import { CartContext } from './context/CartContext';
import Login from './pages/Login';
import Register from './pages/Register'
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { cartCount } = useContext(CartContext);

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);

  const navigateTo = (path) => {
    setIsSidebarOpen(false);
    navigate(path);
  };

  return (
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        navigateTo={navigateTo}
        cartItemCount={cartCount}
        onCartClick={() => navigateTo('cart')}
      />

      <Sidebar isOpen={isSidebarOpen} navigateTo={navigateTo} />

      <main>
        <Routes>
          {/* Página principal con destacados */}
          <Route
            path="/"
            element={
              <>
                <HeroBanner navigateTo={navigateTo} />
                <ProductList limit={4} />
              </>
            }
          />

          <Route
            path="/products"
            element={<ProductList />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetail />}
          />

          <Route path="/contact" element={<ContactForm />} />

          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
