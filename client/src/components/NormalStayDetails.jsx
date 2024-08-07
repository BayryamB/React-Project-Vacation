import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NormalStaysService from "../services/normalStaysService";
import AuthContext from "../contexts/authContext";
import LikesNormalStay from "../services/likesNormalStay";
import unlikeNormalStay from "../services/unlikeNormalStay";
import userService from "../services/userService";

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
    const [cover, setCover] = useState("");

    const isLiked = likes.includes(auth.userId);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    useEffect(() => {
        userService.getUser(auth.userId).then((data) => {
            console.log(data);
            setUser(data);
        });
        NormalStaysService.getNormalStayById(stayId)
            .then((data) => {
                setStay(data);
                setLikes(data.likes);
                setCover(data.cover);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error);
                setIsLoading(false);
            });
    }, [stayId, auth.userId]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const likeHandler = async () => {
        const result = await LikesNormalStay(stayId, auth.userId);
        user.likes.push(stayId);
        await userService.updateUser(auth.userId, user);
        setLikes(result.likes);
    };

    const unlikeHandler = async () => {
        const result = await unlikeNormalStay(stayId, auth.userId);
        user.likes = user.likes.filter((id) => id !== stayId);
        await userService.updateUser(auth.userId, user);
        setLikes(result.likes);
    };
    const coverChanger = (photo) => {
        setCover(photo);
    };

    const editHandler = () => {
        navigate(`/normal-stays/edit/${stayId}`);
    };

    const deleteHandler = () => {
        NormalStaysService.deleteNormalStayById(stayId);
        navigate("/normal-stays");
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
                            <img src={cover} alt="Cover" />
                        </div>
                        <div className="photo-grid">
                            {stay.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`Stay photo ${index + 1}`}
                                    onClick={() => coverChanger(photo)}
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
                        {!isOwner && (
                            <>
                                <button onClick={editHandler} className="Edit">
                                    Edit
                                </button>
                                <button onClick={deleteHandler} className="Del">
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
