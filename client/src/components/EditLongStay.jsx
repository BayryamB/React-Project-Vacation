import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LongTermeStaysService from "../services/longTermStaysService";
const EditLongStay = () => {
    const stayId = useParams().stayId;
    const [formData, setFormData] = useState({
        userId: "",
        location: { country: "", city: "" },
        photos: ["", "", ""],
        cover: "",
        description: "",
        price: "",
        options: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
            smoking: false,
        },
    });

    useEffect(() => {
        const fetchStay = async () => {
            const stay = await LongTermeStaysService.getLongStayById(stayId);
            setFormData(stay);
        };
        fetchStay();
    }, [stayId]);

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

        LongTermeStaysService.editLongStay(formData);
        nav("/long-term-stays/" + stayId);
    };

    return (
        <div className="create-normal-stay">
            <header className="page-header">
                <h1>Edit Stay</h1>
            </header>
            <form onSubmit={handleSubmit} className="rent-form">
                <div className="location-inputs">
                    <input
                        type="text"
                        name="location.country"
                        value={formData.location.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="input-field"
                        required
                    />
                    <input
                        type="text"
                        name="location.city"
                        value={formData.location.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="input-field"
                        required
                    />
                </div>

                <div className="photos-section">
                    <h3 className="photos-title">Photos</h3>
                    {[0, 1, 2].map((index) => (
                        <input
                            key={index}
                            type="text"
                            value={formData.photos[index]}
                            onChange={(e) =>
                                handlePhotoChange(index, e.target.value)
                            }
                            placeholder={`Photo URL ${index + 1}`}
                            className="input-field photo-input"
                            required
                        />
                    ))}
                </div>

                <input
                    type="text"
                    name="cover"
                    value={formData.cover}
                    onChange={handleChange}
                    placeholder="Cover Photo URL"
                    className="input-field"
                    required
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="textarea-field"
                    required
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="input-field"
                    required
                />

                <div className="options-section">
                    <h3 className="options-title">Options</h3>
                    {Object.keys(formData.options).map((option) => (
                        <div key={option} className="option-item">
                            <input
                                type="checkbox"
                                id={option}
                                name={`options.${option}`}
                                checked={formData.options[option]}
                                onChange={handleChange}
                                className="checkbox-input"
                            />
                            <label htmlFor={option} className="option-label">
                                {option}
                            </label>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-button">
                    Update Stay
                </button>
            </form>
        </div>
    );
};

export default EditLongStay;
