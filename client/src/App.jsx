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
//import { useState } from "react";
function App() {
    return (
        <>
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
            </Routes>

            <Footer />
        </>
    );
}

export default App;
