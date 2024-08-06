const API_BASE_URL = "http://localhost:3030";

const NormalStaysService = {
    getAllNormalStays: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/normal-stays`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching normalStays:", error);
            throw error;
        }
    },
    getFiveRecentNormalStays: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/normal-stays/recent`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching normalStays:", error);
            throw error;
        }
    },

    getNormalStayById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/normal-stays/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching normalStay with id ${id}:`, error);
            throw error;
        }
    },

    deleteNormalStayById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/normal-stays/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error deleting normalStay with id ${id}:`, error);
            throw error;
        }
    },
    publishNormalStay(stay) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stay),
        };
        return fetch(`${API_BASE_URL}/normal-stays`, requestOptions);
    },
    editNormalStay(stay) {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stay),
        };
        return fetch(`${API_BASE_URL}/normal-stays${stay._id}`, requestOptions);
    },
};

export default NormalStaysService;
