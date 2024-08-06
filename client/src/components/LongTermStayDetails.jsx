import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LongTermStaysService from "../services/longTermStaysService";
import AuthContext from "../contexts/authContext";

export default function LongTermStayDetails() {
    const { stayId } = useParams();
    const [stay, setStay] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const context = useContext(AuthContext);
    const { authValue } = context;
    const { auth } = authValue;
    const isAuth = auth.username ? true : false;
    const isOwner = isAuth && auth.userId === stay.userId;
    console.log("isAuth", auth.userId);
    console.log("stay", stay);

    useEffect(() => {
        LongTermStaysService.getLongStayById(stayId)
            .then((data) => {
                setStay(data);
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
                    <p className="likes-info">Likes: {stay.likes.length}</p>
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
