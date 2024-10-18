import React from "react";
import { useLogout } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LogoutButton.css";

function LogoutButton() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;