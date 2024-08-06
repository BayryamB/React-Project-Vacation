import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NormalStaysService from "../services/normalStaysService";
import AuthContext from "../contexts/authContext";
import LikesNormalStay from "../services/likesNormalStay";
import unlikeNormalStay from "../services/unlikeNormalStay";

export default function NormalStayDetails() {
    const { stayId } = useParams();
    const [stay, setStay] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const context = useContext(AuthContext);
    const { authValue } = context;
    const { auth } = authValue;
    const isAuth = auth.username ? true : false;
    const isOwner = isAuth && auth.userId === stay.userId;
    const [likes, setLikes] = useState([]);

    const isLiked = likes.includes(auth.userId);
    console.log("Likes", likes);
    console.log("Stay", stay);
    useEffect(() => {
        NormalStaysService.getNormalStayById(stayId)
            .then((data) => {
                setStay(data);
                setLikes(data.likes);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
                setIsLoading(false);
            });
    }, [stayId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const likeHandler = async () => {
        const result = await LikesNormalStay(stayId, auth.userId);
        setLikes(result.likes);
        console.log("Result", result);
    };

    const unlikeHandler = async () => {
        const result = await unlikeNormalStay(stayId, auth.userId);
        setLikes(result.likes);
        console.log("Result", result);
    };

    return (
        <div>
            <div>
                <header className="page-header">
                    <h1>Stay Details</h1>
                </header>
            </div>
            <div className="stay-detail">
                <div className="stay-card">
                    <p className="location-info">
                        Location: {stay.location.city}, {stay.location.country}
                    </p>

                    <h3>Photos:</h3>
                    <div className="stay-photos">
                        <div className="cover-photo-normal">
                            <img src={stay.cover} alt="Cover" />
                        </div>
                        <div className="photo-grid">
                            {stay.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`Stay photo ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <p>Description: {stay.description}</p>

                    <h3>Options:</h3>
                    <ul className="stay-options">
                        {Object.entries(stay.options).map(([option, value]) => (
                            <li key={option}>
                                {option}: {value ? "Yes" : "No"}
                            </li>
                        ))}
                    </ul>
                    <p className="price">Price: ${stay.price} per night</p>
                    <div className="likes">
                        <p className="likes-info">Likes: {likes.length}</p>

                        {isAuth && (
                            <button className="Like">
                                {isLiked ? (
                                    <i
                                        onClick={unlikeHandler}
                                        className="fas fa-thumbs-down"
                                    >
                                        {" "}
                                        Unlike
                                    </i>
                                ) : (
                                    <i
                                        onClick={likeHandler}
                                        className="fas fa-thumbs-up"
                                    >
                                        {" "}
                                        Like
                                    </i>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="buttons">
                        {isAuth && <button className="Book">Book</button>}
                        {isOwner && (
                            <>
                                <button className="Edit">Edit</button>
                                <button className="Del">Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
