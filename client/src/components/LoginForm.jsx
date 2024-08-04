import { useState } from "react";
import AuthContext from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const { authValue } = context;
    const loginHandler = authValue.loginHandler;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here

        loginHandler({ username, password });
        console.log("Login successful");
        // reset form
        setUsername("");
        setPassword("");

        // redirect
        navigate("/");
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login to Your Account</h2>
                <div className="form-group username">
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    LOGIN
                </button>
                <div className="forgot-password">
                    <a href="#">Forgot Password?</a>
                </div>
            </form>
            <div className="quote-container">
                <p className="quote">
                    THE GOAL OF LIFE IS LIVING IN AGREEMENT WITH NATURE.
                </p>
                <div className="social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-linkedin-in"></i>
                    <i className="fab fa-youtube"></i>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
