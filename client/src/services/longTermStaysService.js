const API_BASE_URL = "http://localhost:3030";

const LongTermeStaysService = {
    getAllNormalStays: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/long-term-stays`);
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
            const response = await fetch(
                `${API_BASE_URL}/long-term-stays/recent`
            );
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
};

export default LongTermeStaysService;
