import React from "react";
import "../styles/AuthForm.css";

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit, errorMessage }) => {
    return (
        <div className="auth-form">
            <h1 className="auth-form-header">Inicio de sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                    <label htmlFor="username" className="auth-form-label">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="auth-form-input"
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password" className="auth-form-label">Constraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="auth-form-input"
                    />
                </div>
                <button type="submit" className="auth-form-button">Iniciar sesión</button>
                {errorMessage && <p className="auth-form-error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;