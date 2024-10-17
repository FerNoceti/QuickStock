import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { login, signUp } from "../services/authService";

const LoginSignUpPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setErrorMessage("");
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password };

        try {
            const response = await login(user);
            if (response.status === 200) {
                setErrorMessage("");
                window.location = "/products";
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
                window.location = "/products";
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("Error signing up, please try again.");
        }
    };

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
                        password={password}
                        email={email}
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
