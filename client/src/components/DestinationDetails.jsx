import DestinationService from "../services/destinationService";

const DestinationDetails = () => {
    const destination = DestinationService.getDestinationById(1);
    return (
        <div className="destination-details">
            <div className="discount-badge">50% OFF</div>
            <div className="location-label">New York, USA</div>
        </div>
    );
};

export default DestinationDetails;
