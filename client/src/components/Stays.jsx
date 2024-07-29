import { useEffect, useState } from "react";
import NormalStaysService from "../services/normalStaysService";
import LongTermeStaysService from "../services/longTermStaysService";
const Stays = () => {
    const [stays, setStays] = useState([]);
    const [longStays, setLongStays] = useState([]);
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

        LongTermeStaysService.getFiveRecentNormalStays()
            .then((data) => {
                setLongStays(data);
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
                                <img src={stay.cover} alt="" />
                                <h3>
                                    {stay.location.city} {stay.location.country}
                                </h3>
                                <p>
                                    Created at :{" "}
                                    {new Date(stay.date).toLocaleDateString()}
                                </p>
                                <p className="price">{stay.price} $/night</p>
                                <p className="likes">{stay.likes.length}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <header className="page-header">
                <h1>Long Term Stays</h1>
            </header>

            <main className="stays-content">
                <div className="stays-grid">
                    {longStays.map((stay) => (
                        <div key={stay._id}>
                            <div className="stay-card">
                                <img src={stay.cover} alt="" />
                                <h3>
                                    {stay.location.city} {stay.location.country}
                                </h3>
                                <p>
                                    Created at :{" "}
                                    {new Date(stay.date).toLocaleDateString()}
                                </p>
                                <p className="price">{stay.price} $/month</p>
                                <p className="likes">{stay.likes.length}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Stays;
