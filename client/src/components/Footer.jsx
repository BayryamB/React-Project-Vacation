import { Link } from "react-router-dom";

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
                            <Link to="#" className="footer-link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                Destinations
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                Offers
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                Catalog
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="footer-link">
                                Contact Us
                            </Link>
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
