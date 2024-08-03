import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
const Logout = () => {
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        AuthService.logout();
        navigate("/");
    };
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
export default Logout;
