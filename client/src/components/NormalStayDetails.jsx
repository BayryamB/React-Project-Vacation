import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NormalStaysService from "../services/normalStaysService";
export default function NormalStayDetails() {
    const { stayId } = useParams();
    const [stay, setStay] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        NormalStaysService.getNormalStayById(stayId)
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
                    <p className="price">Price: ${stay.price} per night</p>
                    <p>Description: {stay.description}</p>
                    <p className="likes-info">Likes: {stay.likes.length}</p>
                    <h3>Options:</h3>
                    <ul className="stay-options">
                        {Object.entries(stay.options).map(([option, value]) => (
                            <li key={option}>
                                {option}: {value ? "Yes" : "No"}
                            </li>
                        ))}
                    </ul>
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
                </div>
            </div>
        </div>
    );
}
