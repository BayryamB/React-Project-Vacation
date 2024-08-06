const API_BASE_URL = "http://localhost:3030";

export default function unlikeLongStay(stayId, userId) {
    return fetch(`${API_BASE_URL}/long-term-stays/unlike/${stayId}`, {
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
