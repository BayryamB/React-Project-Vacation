import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
const Logout = () => {
    const { authValue } = useContext(AuthContext);
    const logoutHandler = authValue.logoutHandler;
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        logoutHandler();
        console.log("Logout successful");
        navigate("/");
    };
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
export default Logout;
