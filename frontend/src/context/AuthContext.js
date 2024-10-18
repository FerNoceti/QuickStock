import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}auth/`;

// Crear el contexto
const AuthContext = createContext();

// Crear un proveedor de contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user JSON:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Verificar si el token es válido
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      // Decodificar el token JWT para extraer la fecha de expiración
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos
      return expirationDate < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.warn("Token expired, logging out...");
      logout();
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        console.warn("No user is logged in.");
        return;
      }

      // Llamar a la API para hacer logout
      await axios.post(`${API_URL}logout/${user.username}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Limpiar el estado local y el localStorage después del logout exitoso
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token" || event.key === "user") {
        const newUser = localStorage.getItem("user");
        setUser(newUser ? JSON.parse(newUser) : null);
        setToken(localStorage.getItem("token"));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isLoggedIn = () => !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

// Hooks adicionales para facilitar el acceso a login, logout y user
export function useLogin() {
  const { login } = useAuth();
  return login;
}

export function useLogout() {
  const { logout } = useAuth();
  return logout;
}

export function useUser() {
  const { user } = useAuth();
  return user;
}

export function useIsLoggedIn() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn;
}
