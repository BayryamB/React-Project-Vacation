// import React from "react";

const Destinations = () => {
    const destinations = [
        { image: "/portugal.jpg", discount: 30, location: "Portugal" },
        { image: "/greece.jpg", discount: 20, location: "Greece" },
        { image: "/turkey.jpg", discount: 25, location: "Turkey" },
        { image: "/bulgaria.jpg", discount: 35, location: "Bulgaria" },
    ];

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
                                <img
                                    src={image}
                                    alt={location}
                                    className="destination-image"
                                />
                                <div className="discount-badge">
                                    {discount}% OFF
                                </div>
                                <div className="location-label">{location}</div>
                            </div>
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default Destinations;
