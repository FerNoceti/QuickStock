import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer aria-label="Main Footer" className="footer">
            <div className="footer-container">
                <ul className="footer-list">
                    <li className="footer-item">
                        <NavLink exact to="/" activeClassName="active-link" className="footer-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink to="/products" activeClassName="active-link" className="footer-link">
                            Products
                        </NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink to="/about" activeClassName="active-link" className="footer-link">
                            About Us
                        </NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink to="/contact" activeClassName="active-link" className="footer-link">
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
