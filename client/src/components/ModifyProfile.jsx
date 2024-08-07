import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { useEffect, useState } from "react";

const ModifyProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userService.getUser(userId);
                setUser(response);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [userId]);
    return (
        <>
            <div>
                <header className="page-header">
                    <h1>Modify Profile</h1>
                </header>
            </div>
            <div className="background">
                <form className="modify-profile-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            className="input-field"
                            type="text"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="input-field"
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </div>

                    <button
                        className="btn"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            userService.updateUser(userId, user);
                            navigate("/profile/");
                        }}
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};
export default ModifyProfile;
