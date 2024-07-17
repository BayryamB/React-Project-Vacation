import { Link } from "react-router-dom";

const Navigation = () => {
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
                        <Link to="/offers" className="navbar-link">
                            OFFERS
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/catalog" className="navbar-link">
                            CATALOG
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/contact" className="navbar-link">
                            CONTACT US
                        </Link>
                    </li>
                </ul>
                <div className="navbar-user">
                    <div className="dropdown">
                        <button className="dropbtn">
                            Profile <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navigation;
