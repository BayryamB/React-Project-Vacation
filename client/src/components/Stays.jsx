import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

        LongTermeStaysService.getFiveRecentLongStays()
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
                                <Link to={`/normal-stays/${stay._id}`}>
                                    <img src={stay.cover} alt="" />
                                    <h3>
                                        {stay.location.city}{" "}
                                        {stay.location.country}
                                    </h3>
                                    <p>
                                        Created at :{" "}
                                        {new Date(
                                            stay.date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="price">
                                        {stay.price} $/night
                                    </p>
                                    <p className="likes">{stay.likes.length}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="buttons">
                    <p className="view">
                        <Link to="/normal-stays">View All Normal Stays</Link>
                    </p>
                    <p className="create">
                        <Link to="/normal-stays/create">Rent Your Place</Link>
                    </p>
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
                <div className="buttons">
                    <p className="view">
                        <Link to="/long-term-stays">
                            View All Long Term Stays
                        </Link>
                    </p>
                    <p className="create">
                        <Link to="/long-term-stays/create">
                            Rent Your Place
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Stays;
