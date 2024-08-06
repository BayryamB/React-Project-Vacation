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

    createDestination: async (destination) => {
        try {
            const response = await fetch(`${API_BASE_URL}/destinations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destination),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating destination:", error);
            throw error;
        }
    },

    updateDestination: async (id, destination) => {
        try {
            const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destination),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating destination with id ${id}:`, error);
            throw error;
        }
    },

    deleteDestination: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error deleting destination with id ${id}:`, error);
            throw error;
        }
    },
};

export default DestinationService;
