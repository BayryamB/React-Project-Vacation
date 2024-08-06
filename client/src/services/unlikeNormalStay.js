const API_BASE_URL = "http://localhost:3030";

export default function unlikeNormalStay(stayId, userId) {
    return fetch(`${API_BASE_URL}/normal-stays/unlike/${stayId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
