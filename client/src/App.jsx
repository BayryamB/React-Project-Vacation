import About from "./components/About";
import DestinationDetails from "./components/DestinationDetails";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import RegisterForm from "./components/RegisterForm";
import Section from "./components/Section";
import { Routes, Route } from "react-router-dom";
import Stays from "./components/Stays";
import NormalStays from "./components/NormalStays";
import LongTermStays from "./components/LontTermStays";
import NormalStayDetails from "./components/NormalStayDetails";
import LongTermStayDetails from "./components/LongTermStayDetails";
import AuthContext from "./contexts/authContext";
import { useState } from "react";
import AuthService from "./services/authService";
import CreateNormalStay from "./components/CreateNormalStay";
function App() {
    const [auth, setAuth] = useState({});

    const loginHandler = async (data) => {
        const result = await AuthService.login(data.username, data.password);
        console.log("Result", result);
        setAuth(result);
    };
    const logoutHandler = () => {
        AuthService.logout();
        setAuth({});
    };
    const registerHandler = async (data) => {
        const result = await AuthService.register(
            data.username,
            data.email,
            data.password
        );
        setAuth(result);
    };
    const authValue = { auth, loginHandler, logoutHandler, registerHandler };
    console.log("Auth", auth);
    return (
        <>
            <AuthContext.Provider value={{ authValue }}>
                <Navigation />

                <Routes>
                    <Route path="/" element={<Section />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route
                        path="/destinations/:id"
                        element={<DestinationDetails />}
                    />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/stays" element={<Stays />} />
                    <Route path="/normal-stays" element={<NormalStays />} />
                    <Route
                        path="/long-term-stays"
                        element={<LongTermStays />}
                    />
                    <Route
                        path="/normal-stays/:stayId"
                        element={<NormalStayDetails />}
                    />
                    <Route
                        path="/long-term-stays/:stayId"
                        element={<LongTermStayDetails />}
                    />
                    <Route
                        path="/normal-stays/create"
                        element={<CreateNormalStay />}
                    />
                </Routes>

                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
