import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Footer.css';

function Footer() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <footer aria-label="Main Footer" className="footer">
      <div className="footer-container">
        <ul className="footer-list">
          {location.pathname !== "/" && (
            <li className="footer-item">
              <NavLink
                to="/"
                className={({ isActive }) => `footer-link ${isActive ? 'hidden' : ''}`}
              >
                Home
              </NavLink>
            </li>
          )}
          {user && location.pathname !== "/products" && (
            <li className="footer-item">
              <NavLink
                to="/products"
                className={({ isActive }) => `footer-link ${isActive ? 'hidden' : ''}`}
              >
                Products
              </NavLink>
            </li>
          )}
          <li className="footer-item">
            <NavLink
              to="/about"
              className={({ isActive }) => `footer-link ${isActive ? 'hidden' : ''}`}
            >
              About Us
            </NavLink>
          </li>
          <li className="footer-item">
            <NavLink
              to="/contact"
              className={({ isActive }) => `footer-link ${isActive ? 'hidden' : ''}`}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <p className="footer-text">© 2024 FerNoc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
