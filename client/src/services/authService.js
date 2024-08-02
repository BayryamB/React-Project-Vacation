const API_BASE_URL = "http://localhost:3030";

const AuthService = {
    register: async (username, email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Registered user:", data);
            return data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    },
};

export default AuthService;
