const API_BASE_URL = "http://localhost:3030";

const DestinationService = {
    getAllDestinations: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/destinations`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching destinations:", error);
            throw error;
        }
    },

    getDestinationById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching destination with id ${id}:`, error);
            throw error;
        }
    },

    // You can add more methods here as needed, such as:
    // createDestination, updateDestination, deleteDestination, etc.
};

export default DestinationService;
