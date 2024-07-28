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
        <div className="card-container">
            <div className="card">
                <div className="photo-grid">
                    {photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`${destination.name} Photo ${index + 1}`}
                            className="destination-photo"
                        />
                    ))}
                </div>
                <div className="card-content">
                    <h2 className="destination-name">{destination.name}</h2>
                    <p className="description">{destination.description}</p>
                    {destination.discount && (
                        <div className="discount">
                            {destination.discount}% OFF
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
