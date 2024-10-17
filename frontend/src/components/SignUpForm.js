import React from "react";
import "../styles/AuthForm.css";

const SignUpForm = ({ username, email, password, confirmPassword, handleUsernameChange, handleEmailChange, handlePasswordChange, handleConfirmPasswordChange, handleSubmit, errorMessage }) => {
    return (
        <div className="auth-form">
            <h1 className="auth-form-header">Registro de usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="auth-form-group">
                    <label htmlFor="username" className="auth-form-label">Username:</label>
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
                    <label htmlFor="email" className="auth-form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="auth-form-input"
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password" className="auth-form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="auth-form-input"
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="confirmPassword" className="auth-form-label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="auth-form-input"
                    />
                </div>
                <button type="submit" className="auth-form-button">Sign Up</button>
                {errorMessage && <p className="auth-form-error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignUpForm;
