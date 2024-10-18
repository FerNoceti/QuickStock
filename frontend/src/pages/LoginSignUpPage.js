import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { login, signUp } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginSignUpPage.css";

const LoginSignUpPage = ({ wantLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(wantLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, login: loginUser } = useAuth(); // Extrae loginUser desde el contexto

  useEffect(() => {
    setIsLogin(wantLogin);
  }, [wantLogin]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const response = await login(userData);
      if (response.status === 200) {
        setErrorMessage("");
        const { token, username, email } = response.data;
        loginUser({ username, email }, token); // Guarda el usuario y el token en el contexto
        navigate("/"); // Redirige después de iniciar sesión
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Error logging in, please try again.");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const newUser = { username, email, password };

    try {
      const response = await signUp(newUser);
      if (response.status === 201) {
        setErrorMessage("");
        const { token, username, email } = response.data;
        loginUser({ username, email }, token); // Guarda el usuario y el token en el contexto
        navigate("/"); // Redirige después de registrarse
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Error signing up, please try again.");
    }
  };

  if (user) {
    return <div>Bienvenido, {user.username}!</div>;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(e) => setUsername(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)}
            handleSubmit={handleLoginSubmit}
            errorMessage={errorMessage}
          />
        ) : (
          <SignUpForm
            username={username}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            handleUsernameChange={(e) => setUsername(e.target.value)}
            handleEmailChange={(e) => setEmail(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)}
            handleConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
            handleSubmit={handleSignUpSubmit}
            errorMessage={errorMessage}
          />
        )}
        <button onClick={handleToggle} className="auth-toggle">
          {isLogin ? "Create an account" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
