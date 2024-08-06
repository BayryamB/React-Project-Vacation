const API_BASE_URL = "http://localhost:3030";

const LongTermeStaysService = {
    getAllLongStays: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/long-term-stays`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching LongStays:", error);
            throw error;
        }
    },
    getFiveRecentLongStays: async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/long-term-stays/recent`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching LongStays:", error);
            throw error;
        }
    },
    getLongStayById: async (stayId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/long-term-stays/${stayId}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching LongStays:", error);
            throw error;
        }
    },
    deleteLogStayById: async (stayId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/long-term-stays/${stayId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting LongStays:", error);
            throw error;
        }
    },
};

export default LongTermeStaysService;
