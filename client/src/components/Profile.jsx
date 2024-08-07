import { useContext, useEffect, useState } from "react";
import userService from "../services/userService";
import AuthContext from "../contexts/authContext";
const Profile = () => {
    const context = useContext(AuthContext);
    const { authValue } = context;
    const { auth } = authValue;
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userService.getUser(auth.userId);
                setUser(response);
                setLikes(response.likes);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [auth.userId, likes]);

    return (
        <div>
            <div>
                <header className="page-header">
                    <h1>Stay Details</h1>
                </header>
            </div>
            <div className="profile-container">
                <div className="profile-card">
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
                        <p>Cart: {user.watchlist}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
