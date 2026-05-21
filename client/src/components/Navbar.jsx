import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar({ toggleSidebar, cartItemCount }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__container">
        {/* Menú lateral */}
        <div
          className="menu__container"
          onClick={toggleSidebar}
          onKeyDown={(e) => e.key === 'Enter' && toggleSidebar?.()}
          role="button"
          tabIndex={0}
          aria-label="Abrir menú lateral"
        >
          <div className="menu-toggle" id="menu">
            <img src="/imagenes/menu-svgrepo-com.svg" alt="Abrir menú" />
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="nav__bar" aria-label="Navegación principal">
          <div className="logo__container">
            <Link to="/" className="logo__link">
              <img src="/imagenes/logo.svg" alt="Logo" className="logo-item" />
              <h1 className="nombre">Hermanos Jota</h1>
            </Link>
          </div>

          <div className="nav__container">
            <ul className="nav__links">
              <li className="nav__items">
                <Link to="/">Inicio</Link>
              </li>
              <li className="nav__items">
                <Link to="/products">Productos</Link>
              </li>
              <li className="nav__items">
                <Link to="/contact">Contacto</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Iconos cuenta + carrito */}
        <div className="funcionalidades__container">
          <div className="account-widget">
            {isAuthenticated ? (
              <div className="user-menu">
                <img src="/imagenes/user-svgrepo-com.svg" alt="Usuario" />
                <span className="user-name">{user?.nombre || user?.email || 'Usuario'}</span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="nav-auth-btn">Login</Link>
                <Link to="/register" className="nav-auth-btn">Register</Link>
              </div>
            )}
          </div>
          
          <div className="cart-widget">
            <Link to="/cart" aria-label="Carrito">
              <img src="/imagenes/shopping-cart-svgrepo-com.svg" alt="Carrito" />
              {cartItemCount > 0 && <span id="cart-count">{cartItemCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;