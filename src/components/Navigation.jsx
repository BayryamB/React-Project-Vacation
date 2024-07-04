const Navigation = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <a href="/">
                        <img
                            src="/path-to-your-logo.png"
                            alt="KETO"
                            className="logo-image"
                        />
                        <span className="logo-text">KETO</span>
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
                        <a href="/our-room" className="navbar-link">
                            OUR ROOM
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="/gallery" className="navbar-link">
                            GALLERY
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="/blog" className="navbar-link">
                            BLOG
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
