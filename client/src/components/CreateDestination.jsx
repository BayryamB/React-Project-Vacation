import { useState } from "react";
import DestinationService from "../services/destinationService";
import { useNavigate } from "react-router-dom";
const CreateDestinationForm = () => {
    const [destination, setDestination] = useState({
        name: "",
        country: "",
        description: "",
        photos: ["", "", ""], // Assuming we want 3 photo URLs
        cover: "",
        discount: 0,
        price: 0,
        guide: "",
        rating: 0,
        overview: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (index, value) => {
        const newPhotos = [...destination.photos];
        newPhotos[index] = value;
        setDestination((prev) => ({ ...prev, photos: newPhotos }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        DestinationService.createDestination(destination);
        navigate("/destinations");
    };

    return (
        <div className="create-destination-form-container">
            <form onSubmit={handleSubmit} className="create-destination-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="name"
                        name="name"
                        value={destination.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="country"
                        name="country"
                        value={destination.country}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="textarea-field"
                        id="description"
                        name="description"
                        value={destination.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Photos:</label>
                    {destination.photos.map((photo, index) => (
                        <input
                            className="input-field"
                            key={index}
                            type="text"
                            value={photo}
                            onChange={(e) =>
                                handlePhotoChange(index, e.target.value)
                            }
                            placeholder={`Photo URL ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="cover">Cover Photo URL:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="cover"
                        name="cover"
                        value={destination.cover}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="discount">Discount:</label>
                    <input
                        className="input-field"
                        type="number"
                        id="discount"
                        name="discount"
                        value={destination.discount}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        className="input-field"
                        type="number"
                        id="price"
                        name="price"
                        value={destination.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="guide">Guide:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="guide"
                        name="guide"
                        value={destination.guide}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <input
                        className="input-field"
                        type="number"
                        id="rating"
                        name="rating"
                        value={destination.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="overview">Overview:</label>
                    <textarea
                        className="textarea-field"
                        id="overview"
                        name="overview"
                        value={destination.overview}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-button">
                    Create Destination
                </button>
            </form>
        </div>
    );
};

export default CreateDestinationForm;
