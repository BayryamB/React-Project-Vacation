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
            <h2>Stay Details</h2>
            <p>
                Location: {stay.location.city}, {stay.location.country}
            </p>
            <p>Price: ${stay.price} per night</p>
            <p>Description: {stay.description}</p>
            <p>Likes: {stay.likes.length}</p>
            <h3>Options:</h3>
            <ul>
                {Object.entries(stay.options).map(([option, value]) => (
                    <li key={option}>
                        {option}: {value ? "Yes" : "No"}
                    </li>
                ))}
            </ul>
            <h3>Photos:</h3>
            <div>
                {stay.photos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`Stay photo ${index + 1}`}
                        style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "cover",
                            margin: "5px",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
