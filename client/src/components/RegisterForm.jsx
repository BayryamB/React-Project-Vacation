import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterValidator from "../utils/registerValidator";
import AuthService from "../services/authService";
const RegisterForm = () => {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password,
            confirmPassword,
        };
        const errors = RegisterValidator(userData);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        // Handle registration logic here
        AuthService.register(username, email, password);
        console.log("Registration successful");
        // reset form
        setuserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // redirect
        navigate("/");
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>
                <div className="form-group username">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="userName"
                        value={username}
                        onChange={(e) => setuserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {errors.password && <p className="error">{errors.password}</p>}
                {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                )}

                {errors.email && <p className="error">{errors.email}</p>}

                {errors.userName && <p className="error">{errors.userName}</p>}

                <button type="submit" className="login-button">
                    REGISTER
                </button>
                <div className="forgot-password">
                    <Link to="/login">Already have an account? Log in</Link>
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

export default RegisterForm;
