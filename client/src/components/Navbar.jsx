import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import './Navbar.css';

function Navbar({ toggleSidebar }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  // Iniciales del usuario para el avatar
  const initials = user?.nombre
    ? user.nombre.slice(0, 2).toUpperCase()
    : user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'U';

  const displayName = user?.nombre || user?.email || 'Usuario';

  return (
    <header>
      <nav className="hj-nav">

        <Link to="/" className="hj-nav__logo">
          <div className="hj-nav__logo-mark">
            <span>HJ</span>
          </div>
          <span className="hj-nav__brand">Hermanos Jota</span>
        </Link>

         <ul className="hj-nav__links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Contacto
            </NavLink>
          </li>
        </ul>

        <div className="hj-nav__actions">
          {isAuthenticated ? (
            <div className="hj-nav__user-pill">
              <div className="hj-nav__avatar">{initials}</div>
              <span className="hj-nav__user-name">{displayName}</span>
              <button
                className="hj-nav__logout"
                onClick={logout}
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
          ) : (
            <div className="hj-nav__auth">
              <Link to="/login" className="hj-nav__btn-ghost">Ingresar</Link>
              <Link to="/register" className="hj-nav__btn-solid">Registrarse</Link>
            </div>
          )}

          <div className="hj-nav__divider" aria-hidden="true" />

          <Link to="/cart" className="hj-nav__icon-btn" aria-label="Carrito de compras">
            <svg viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="hj-nav__badge" aria-label={`${cartCount} productos en carrito`}>
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="hj-nav__hamburger"
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <svg viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;