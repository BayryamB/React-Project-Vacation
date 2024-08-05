export default function likesNormalStay(stayId) {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:5000/normal-stays/like/${stayId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
