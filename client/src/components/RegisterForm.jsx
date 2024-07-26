import { useState } from "react";

const RegisterForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log("Registration submitted", {
            fullName,
            email,
            password,
            confirmPassword,
            agreeTerms,
        });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>
                <div className="form-group fullName">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                <div className="remember-me">
                    <input
                        type="checkbox"
                        id="agree-terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        required
                    />
                    <label htmlFor="agree-terms">
                        I agree to the Terms and Conditions
                    </label>
                </div>
                <button type="submit" className="login-button">
                    REGISTER
                </button>
                <div className="forgot-password">
                    <a href="#">Already have an account? Log in</a>
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
