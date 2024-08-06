const API_BASE_URL = "http://localhost:3030";

export default function editLongStay(stay) {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stay),
    };
    return fetch(`${API_BASE_URL}/long-term-stays/${stay._id}`, requestOptions);
}
