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
import CreateLongStay from "./components/CreateLongStay";
import EditNormalStay from "./components/EditNormalStay";
import EditLongStay from "./components/EditLongStay";
import CreateDestinationForm from "./components/CreateDestination";
import EditDestination from "./components/EditDestination";
import Profile from "./components/Profile";
import ModifyProfile from "./components/ModifyProfile";
function App() {
    const [auth, setAuth] = useState({});

    const loginHandler = async (data) => {
        const result = await AuthService.login(data.username, data.password);
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
                        element={
                            auth.username ? <CreateNormalStay /> : <LoginForm />
                        }
                    />
                    <Route
                        path="/long-term-stays/create"
                        element={
                            auth.username ? <CreateLongStay /> : <LoginForm />
                        }
                    />
                    <Route
                        path="/normal-stays/edit/:stayId"
                        element={
                            auth.username ? <EditNormalStay /> : <LoginForm />
                        }
                    />
                    <Route
                        path="/long-term-stays/edit/:stayId"
                        element={
                            auth.username ? <EditLongStay /> : <LoginForm />
                        }
                    />
                    <Route
                        path="/destinations/create"
                        element={
                            auth.username === "admin" ? (
                                <CreateDestinationForm />
                            ) : (
                                <LoginForm />
                            )
                        }
                    />
                    <Route
                        path="/destinations/edit/:destinationId"
                        element={
                            auth.username === "admin" ? (
                                <EditDestination />
                            ) : (
                                <LoginForm />
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={auth.username ? <Profile /> : <LoginForm />}
                    />
                    <Route
                        path="/profile/modify/:userId"
                        element={
                            auth.username ? <ModifyProfile /> : <LoginForm />
                        }
                    />
                </Routes>
                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
