const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3 className="footer-heading">Contact US</h3>
                    <p>
                        <i className="fas fa-map-marker-alt"></i> Address
                    </p>
                    <p>
                        <i className="fas fa-phone"></i> +01 1234569540
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i> demo@gmail.com
                    </p>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">Menu Link</h3>
                    <ul>
                        <li>
                            <a href="#" className="footer-link">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                Our Room
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                Gallery
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3 className="footer-heading">News letter</h3>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="footer-input"
                    />
                    <button className="footer-button">SUBSCRIBE</button>
                    <div className="footer-social-icons">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-linkedin-in"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
