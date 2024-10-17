import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/NavBar.css";

function NavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location = "/"; // Redirige después de cerrar sesión
  };

  return (
    <nav aria-label="Main Navigation" className="navbar">
      <ul className="nav-list">
        {location.pathname !== "/" && (
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'hidden' : ''}`}
            >
              Home
            </NavLink>
          </li>
        )}
        {user && location.pathname !== "/products" && (
          <li className="nav-item">
            <NavLink 
              to="/products" 
              className={({ isActive }) => `nav-link ${isActive ? 'hidden' : ''}`}
            >
              Products
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          {user ? (
            <div className="nav-link">
              Hola, {user.username}!
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            location.pathname !== "/login" && (
              <NavLink 
                to="/login" 
                className={({ isActive }) => `nav-link ${isActive ? 'hidden' : ''}`}
              >
                Login
              </NavLink>
            )
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
