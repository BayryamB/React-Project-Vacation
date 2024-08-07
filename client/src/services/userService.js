const API_BASE_URL = "http://localhost:3030";

const userService = {
    getUser: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    },
    updateUser: async (userId, userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    },
};

export default userService;
