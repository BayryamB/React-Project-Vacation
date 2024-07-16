const Navigation = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/">
                        <img
                            src="/Hand-drawn-a-palm-tress-illustration-on-transparent-background-PNG.png"
                            alt="ET"
                            className="logo-image"
                        />
                        <span className="logo-text">Easy Travel</span>
                    </a>
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a href="/" className="navbar-link active">
                            HOME
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="/about" className="navbar-link">
                            ABOUT
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="/destinations" className="navbar-link">
                            DESTINATIONS
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="/offers" className="navbar-link">
                            OFFERS
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="/catalog" className="navbar-link">
                            CATALOG
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="/contact" className="navbar-link">
                            CONTACT US
                        </a>
                    </li>
                </ul>
                <div className="navbar-user">
                    <div className="dropdown">
                        <button className="dropbtn">
                            Profile <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                            <a href="/logout">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navigation;
