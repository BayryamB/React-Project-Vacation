import About from "./components/About";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import { Routes, Route } from "react-router-dom";
//import { useState } from "react";
function App() {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Section />} />
                <Route path="/about" element={<About />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
