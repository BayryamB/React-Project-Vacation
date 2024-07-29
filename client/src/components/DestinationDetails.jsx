import { useEffect, useState } from "react";
import DestinationService from "../services/destinationService";
import { useParams } from "react-router-dom";
export default function DestinationDetails() {
    const { id } = useParams();
    const [destination, setDestination] = useState({});
    const photos = destination.photos || [];
    useEffect(() => {
        DestinationService.getDestinationById(id)
            .then((data) => {
                console.log(data);
                setDestination(data);
            })
            .catch((error) => {
                console.error("Error fetching destination:", error);
            });
    }, [id]);
    return (
        <div className="destination-detail">
            <main>
                <section className="destination-info">
                    <h1>
                        {destination.name} {destination.country}
                    </h1>
                    <p>{destination.description}</p>
                    <div className="location-info">
                        <span>📍 {destination.country}</span>
                        <span>
                            ⭐ {destination.rating} ({destination.likes}{" "}
                            Reviews)
                        </span>
                        <span>👤 {destination.guide}</span>
                    </div>
                    <div className="price-info">
                        <h2>
                            ${destination.price}
                            <span>/Person a week</span>
                        </h2>
                        <button className="share-button">
                            <i className="fa fa-share-alt"></i> Share
                        </button>
                        {destination.discount > 0 && (
                            <div className="discount">
                                {destination.discount}% OFF
                            </div>
                        )}
                        <button className="buy-button">Buy Now</button>
                        <button className="add-to-cart">Add to Chart</button>
                    </div>
                </section>

                <section className="destination-image">
                    <img src={destination.cover} alt={destination.name} />
                    <div className="photo-gallery">
                        <div className="photo-grid">
                            {photos.slice(0, 3).map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`${destination.name} ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                    <aside className="reviews">
                        <h3>Reviews and ratings</h3>
                        <div className="overall-rating">
                            <span className="rating">{destination.rating}</span>
                            <div className="stars">
                                {"⭐".repeat(Math.round(destination.rating))}
                            </div>
                            <span>Based on {destination.likes} reviewers</span>
                        </div>
                        <section className="additional-info">
                            <div className="overview">
                                <h3>Comfortable place for you</h3>
                                <p>{destination.overview}</p>
                            </div>
                        </section>
                    </aside>
                </section>
            </main>
        </div>
    );
}
