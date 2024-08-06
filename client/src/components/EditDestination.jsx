import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DestinationService from "../services/destinationService";

const EditDestination = () => {
    const destinationId = useParams().destinationId;
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        description: "",
        photos: ["", "", ""],
        cover: "",
        discount: 0,
        price: 0,
        guide: "",
        rating: 0,
        overview: "",
        likes: [],
        comments: [],
    });
    useEffect(() => {
        const fetchDestination = async () => {
            const destination = await DestinationService.getDestinationById(
                destinationId
            );
            setFormData(destination);
        };
        fetchDestination();
    }, [destinationId]);
    const nav = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };
    const handlePhotoChange = (index, value) => {
        const newPhotos = [...formData.photos];
        newPhotos[index] = value;
        setFormData((prev) => ({ ...prev, photos: newPhotos }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        DestinationService.updateDestination(destinationId, formData);
        nav(`/destinations/${destinationId}`);
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
                        value={formData.name}
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
                        value={formData.country}
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
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Photos:</label>
                    {formData.photos.map((photo, index) => (
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
                        value={formData.cover}
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
                        value={formData.discount}
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
                        value={formData.price}
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
                        value={formData.guide}
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
                        value={formData.rating}
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
                        value={formData.overview}
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

export default EditDestination;
