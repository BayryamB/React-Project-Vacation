import { useEffect, useState } from "react";
import NormalStaysService from "../services/normalStaysService";
import StayOptions from "./StayOptions";
const Stays = () => {
    const [stays, setStays] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        NormalStaysService.getFiveRecentNormalStays()
            .then((data) => {
                setStays(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="stays-page">
            <header className="page-header">
                <h1>Normal Stays</h1>
            </header>

            <main className="stays-content">
                <div className="stays-grid">
                    {stays.map((stay) => (
                        <div key={stay._id}>
                            <div className="stay-card">
                                <h3>
                                    {stay.location.city} {stay.location.country}
                                </h3>
                                <img src={stay.cover} alt="" />
                                <p>Created at : {stay.date}</p>
                                <p>{stay.price}</p>
                                <p>{stay.likes.length}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <header className="page-header">
                <h1>Long Term Stays</h1>
            </header>

            <main className="stays-content">
                <div className="stays-grid"></div>
            </main>
        </div>
    );
};

export default Stays;
