const API_BASE_URL = "http://localhost:3030";

export default function publishLongStay(stay) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stay),
    };
    return fetch(`${API_BASE_URL}/long-term-stays`, requestOptions);
}
