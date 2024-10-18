import React from 'react';
import { useAuth } from '../context/AuthContext';
import "../styles/HomePage.css";

function HomePage() {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="home-container">
      {isLoggedIn() ? (
        <>
          <h1 className="home-title">¡Bienvenido, {user?.username}!</h1>
          <p className="home-text">Administra tu inventario de manera eficiente.</p>
          <button className="home-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <h1 className="home-title">Bienvenido a QuickStock</h1>
          <p className="home-text">
            Por favor, inicia sesión para administrar tu inventario.
          </p>
        </>
      )}
    </div>
  );
}

export default HomePage;
