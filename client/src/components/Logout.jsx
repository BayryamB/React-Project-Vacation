import AuthService from "../services/authService";

const Logout = () => {
    const logout = () => {
        AuthService.logout();
    };
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
export default Logout;
