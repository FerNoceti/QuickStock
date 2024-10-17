import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  return (
    <nav aria-label="Main Navigation" className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink exact to="/" activeClassName="active-link" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/products" activeClassName="active-link" className="nav-link">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" activeClassName="active-link" className="nav-link">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
