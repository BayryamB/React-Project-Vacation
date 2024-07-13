import { useState, useEffect } from "react";

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: "/1.jpg",
            title: "Luxurious Rooms",
        },
        { image: "/2.jpg", title: "Breathtaking Views" },
        { image: "/3.jpg", title: "Unforgettable Experiences" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    });

    return (
        <section
            className="hero-section"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        >
            <div className="hero-content">
                <div className="booking-panel">
                    <h2 className="booking-title">BOOK A ROOM ONLINE</h2>
                    <p className="booking-subtitle">
                        {slides[currentSlide].title}
                    </p>
                    <button className="booking-button">Book Now</button>
                </div>
            </div>
            <div className="hero-indicators">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${
                            index === currentSlide ? "active" : ""
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
