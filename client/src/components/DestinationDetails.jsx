import { useEffect, useState, useContext } from "react";
import DestinationService from "../services/destinationService";
import { useParams, Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import userService from "../services/userService";
export default function DestinationDetails() {
    const { id } = useParams();
    const [destination, setDestination] = useState({});
    const photos = destination.photos || [];
    const [mainPhoto, setMainPhoto] = useState(photos[0]);
    const [user, setUser] = useState({});
    const context = useContext(AuthContext);
    const { authValue } = context;
    const { auth } = authValue;
    const isAdmin = auth.username === "admin" ? true : false;
    useEffect(() => {
        if (auth.username) {
            userService.getUser(auth.userId).then((data) => {
                setUser(data);
            });
        }
        DestinationService.getDestinationById(id)
            .then((data) => {
                setDestination(data);
                setMainPhoto(data.cover);
            })
            .catch((error) => {
                console.error("Error fetching destination:", error);
            });
    }, [id, auth]);
    const navigate = useNavigate();

    const handleMainPhotoClick = (photo) => {
        setMainPhoto(photo);
    };

    const deleteHandler = () => {
        DestinationService.deleteDestination(id);
        navigate("/destinations");
    };

    const buyHandler = () => {
        user.watchlist.push({ destination: id });
        userService.updateUser(auth.userId, user);
    };
    return (
        <div className="destination-detail">
            <main>
                {isAdmin && (
                    <div className="destination-buttons">
                        <Link to={`/destinations/create`}>
                            <button className="New">New destination</button>
                        </Link>
                        <Link to={`/destinations/edit/${id}`}>
                            <button className="Edit">Edit</button>
                        </Link>
                        <button onClick={deleteHandler} className="Del">
                            Delete
                        </button>
                    </div>
                )}
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
                        <button onClick={buyHandler} className="buy-button">
                            Buy Now
                        </button>
                    </div>
                </section>

                <section className="destination-image">
                    <img
                        className="main-photo"
                        src={mainPhoto}
                        alt={destination.name}
                    />
                    <div className="photo-gallery">
                        <div className="photo-grid">
                            {photos.map((photo, index) => (
                                <img
                                    onClick={() => handleMainPhotoClick(photo)}
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
                                <h3>
                                    More information about {destination.name}
                                </h3>
                                <p>{destination.overview}</p>
                            </div>
                        </section>
                    </aside>
                </section>
            </main>
        </div>
    );
}
