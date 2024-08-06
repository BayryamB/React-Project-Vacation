// import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DestinationService from "../services/destinationService";
import AuthContext from "../contexts/authContext";
const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const context = useContext(AuthContext);
    const { authValue } = context;
    const { auth } = authValue;
    const isAdmin = auth.username === "admin" ? true : false;

    useEffect(() => {
        DestinationService.getAllDestinations()
            .then((data) => {
                setDestinations(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="destinations-page">
            <header className="page-header">
                <h1>Our Destinations</h1>
            </header>
            {isAdmin && (
                <div className="create-destination">
                    <Link to="/destinations/create">
                        <button className="create-destination-button">
                            Create Destination
                        </button>
                    </Link>
                </div>
            )}
            <main className="destinations-content">
                <div className="destinations-grid">
                    {destinations.map((destination) => (
                        <div key={destination._id} className="destination-card">
                            <Link to={`/destinations/${destination._id}`}>
                                <img
                                    src={destination.cover}
                                    alt={destination.name}
                                    className="destination-image destinations-image"
                                />
                            </Link>
                            <div className="destination-details">
                                <div className="discount-badge">
                                    {destination.discount}% OFF
                                </div>
                                <div className="location-label">
                                    {`${destination.name} ${destination.country}`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Destinations;
