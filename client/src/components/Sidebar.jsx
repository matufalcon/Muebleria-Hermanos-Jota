import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const { isAuthenticated, logout } = useAuth();

  const handleLinkClick = () => onClose();

  const handleLogout = () => {
    logout();
    onClose();
  }

  return (
    <>
      <div 
        className={`hj-sidebar__overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
    
    <aside className={`hj-sidebar ${isOpen ? 'open' : ''}`}  aria-label="Menú lateral">
      <div className="hj-sidebar__header">
        <span className="hj-sidebar__title">Menú</span>
          <button className="hj-sidebar__close" onClick={onClose} aria-label="Cerrar menú">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <nav className="hj-sidebar__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `hj-sidebar__link ${isActive ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Inicio
          </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) => `hj-sidebar__link ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          Productos
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => `hj-sidebar__link ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          Contacto
        </NavLink>

        <div className="hj-sidebar__divider" />

        <NavLink
          to="/cart"
          className={({ isActive }) => `hj-sidebar__link ${isActive ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <svg viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Carrito
        </NavLink>

        <div className="hj-sidebar__divider" />

        {isAuthenticated ? (
          <button className="hj-sidebar__link" onClick={handleLogout}>
            <svg viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Cerrar sesión
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => `hj-sidebar__link ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Ingresar
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) => `hj-sidebar__link ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <svg viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Registrarse
            </NavLink>
          </>
        )}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
