import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";
import "../styles/NavBar.css";

function NavBar() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav aria-label="Main Navigation" className="navbar">
      <ul className="nav-list">
        {location.pathname !== "/" && (
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'hidden' : ''}`}
            >
              Inicio
            </NavLink>
          </li>
        )}
        {user && location.pathname !== "/products" && (
          <li className="nav-item">
            <NavLink 
              to="/products" 
              className={({ isActive }) => `nav-link ${isActive ? 'hidden' : ''}`}
            >
              Productos
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          {user ? (
            <div className="nav-link">
              Hola, {user.username}!
              <LogoutButton className="nav-button"/>
            </div>
          ) : (
            location.pathname !== "/login" && (
              <NavLink 
                to="/login" 
                className={({ isActive }) => `nav-link ${isActive ? 'hidden' : ''}`}
              >
                Iniciar sesión
              </NavLink>
            )
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
