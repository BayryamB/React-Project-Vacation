import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import LongTermeStaysService from "../services/longTermStaysService";
import AuthContext from "../contexts/authContext";

const LongTermStays = () => {
    const [stays, setStays] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const context = useContext(AuthContext);
    const { authValue } = context;
    const { auth } = authValue;
    const isAuth = auth.username ? true : false;

    useEffect(() => {
        LongTermeStaysService.getAllLongStays()
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
                    {isAuth && (
                        <p className="create">
                            <Link to="/long-term-stays/create">
                                Rent Your Place
                            </Link>
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LongTermStays;
