import React, { useState, useEffect, createContext, useContext } from "react";

// Crear el contexto
const AuthContext = createContext();

// Crear un proveedor de contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Obtenemos el usuario almacenado en localStorage
    const storedUser = localStorage.getItem("user");

    // Verificamos si el valor es válido antes de hacer JSON.parse
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user JSON:", error);
      return null; // Si hay un error en el parseo, regresamos null
    }
  });

  useEffect(() => {
    // Cuando cambia el usuario, actualizamos el localStorage
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}
