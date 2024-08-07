import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import AuthContext from "../contexts/authContext";
import NormalStaysService from "../services/normalStaysService";
import LongTermeStaysService from "../services/longTermStaysService";
import DestinationService from "../services/destinationService";
const Profile = () => {
    const context = useContext(AuthContext);
    const { authValue } = context;
    const { auth } = authValue;
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [viewCartActive, setViewCartActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userService.getUser(auth.userId);
                setUser(response);
                setLikes(response.likes);
                setWatchlist(response.watchlist);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [auth.userId, likes]);

    const [normalStays, setNormalStays] = useState([]);
    const [longStays, setLongStays] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const WatchlistiCard = () => {
        watchlist.map((item) => {
            if (item.normal) {
                NormalStaysService.getNormalStayById(item.normal).then(
                    (data) => {
                        setNormalStays((prevNormalStays) => [
                            ...prevNormalStays,
                            data,
                        ]);
                    }
                );
            } else if (item.long) {
                LongTermeStaysService.getLongStayById(item.long).then(
                    (data) => {
                        setLongStays((prevLongStays) => [
                            ...prevLongStays,
                            data,
                        ]);
                    }
                );
            } else {
                DestinationService.getDestinationById(item.destination).then(
                    (data) => {
                        setDestinations((prevDestinations) => [
                            ...prevDestinations,
                            data,
                        ]);
                    }
                );
            }
        });

        setViewCartActive(!viewCartActive);
    };

    const modifyHandler = () => {
        navigate("/profile/modify/" + auth.userId);
    };

    return (
        <div>
            <div>
                <header className="page-header">
                    <h1>Profile Page</h1>
                </header>
            </div>
            <div className="profile-container">
                <div className="profile-card">
                    <button
                        onClick={modifyHandler}
                        className="button button-modify"
                    >
                        Modify Profile
                    </button>
                    <div className="profile-image">
                        <img
                            src="../../public/profile.jpg"
                            alt={user.username}
                            className="profile-img"
                        />
                    </div>
                    <div className="profile-details">
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                        <p>Likes: {likes.length}</p>
                        <p>Cart: {watchlist.length}</p>
                        {!viewCartActive && (
                            <button className="cart" onClick={WatchlistiCard}>
                                View Cart
                            </button>
                        )}
                        {viewCartActive && (
                            <button
                                className="cart"
                                onClick={() => {
                                    setNormalStays([]);
                                    setLongStays([]);
                                    setDestinations([]);
                                    setViewCartActive(!viewCartActive);
                                }}
                            >
                                Hide Cart
                            </button>
                        )}
                    </div>
                    {normalStays.length > 0 && (
                        <div className="normal-stays">
                            <h3>Normal Stays</h3>
                            <ul className="list">
                                {normalStays.map((item) => (
                                    <div className="card" key={item._id}>
                                        <Link to={`/normal-stays/${item._id}`}>
                                            <img
                                                src={item.cover}
                                                alt={item.location.city}
                                            />
                                        </Link>
                                        <p>
                                            {item.location.city}{" "}
                                            {item.location.country}
                                        </p>
                                        <p>{item.price} € per night</p>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                    {longStays.length > 0 && (
                        <div className="long-stays">
                            <h3>Long Term Stays</h3>
                            <ul className="list">
                                {longStays.map((item) => (
                                    <div className="card" key={item._id}>
                                        <Link
                                            to={`/long-term-stays/${item._id}`}
                                        >
                                            <img
                                                src={item.cover}
                                                alt={item.location.city}
                                            />
                                        </Link>
                                        <p>
                                            {item.location.city}{" "}
                                            {item.location.country}
                                        </p>
                                        <p>{item.price} € per month</p>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                    {destinations.length > 0 && (
                        <div className="destinations">
                            <h3>Destinations</h3>
                            <ul className="list">
                                {destinations.map((item) => (
                                    <div className="card" key={item._id}>
                                        <Link to={`/destinations/${item._id}`}>
                                            <img
                                                src={item.cover}
                                                alt={item.name}
                                            />
                                        </Link>
                                        <p>
                                            {item.name} {item.country}
                                        </p>
                                        <p>{item.price} € 10 days</p>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
