// import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DestinationService from "../services/destinationService";
const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

            <main className="destinations-content">
                <div className="destinations-grid">
                    {destinations.map(
                        ({ image, discount, location }, index) => (
                            <div key={index} className="destination-card">
                                <Link
                                    to={`/destinations/${location
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                >
                                    <img
                                        src={image}
                                        alt={location}
                                        className="destination-image"
                                    />
                                </Link>
                                <div className="destination-details">
                                    <div className="discount-badge">
                                        {discount}% OFF
                                    </div>
                                    <div className="location-label">
                                        {location}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default Destinations;
