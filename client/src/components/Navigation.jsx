import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";

const Navigation = () => {
    const { authValue } = useContext(AuthContext);
    const { auth } = authValue;
    const user = localStorage.getItem("user");

    console.log("Auth from Navigation", auth);
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img
                            src="/Hand-drawn-a-palm-tress-illustration-on-transparent-background-PNG.png"
                            alt="ET"
                            className="logo-image"
                        />
                        <span className="logo-text">Easy Travel</span>
                    </Link>
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link active">
                            HOME
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link">
                            ABOUT
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/destinations" className="navbar-link">
                            DESTINATIONS
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/stays" className="navbar-link">
                            STAYS
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/normal-stays" className="navbar-link">
                            Normal Stays
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/long-term-stays" className="navbar-link">
                            Lont Term Stays
                        </Link>
                    </li>
                </ul>
                <div className="navbar-user">
                    <div className="user-links">
                        {user ? (
                            <>
                                <Link to="/profile">
                                    {user}
                                    {" profile"}
                                </Link>
                                <Logout />
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navigation;
