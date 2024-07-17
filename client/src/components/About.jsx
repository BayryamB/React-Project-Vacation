/* eslint-disable react/no-unescaped-entities */
const About = () => {
    return (
        <div className="about-us-page">
            <header className="page-header">
                <h1>ABOUT US</h1>
            </header>

            <main className="about-us-content">
                <section className="about-us-section">
                    <div className="about-us-text">
                        <p>
                            The passage experienced a surge in popularity during
                            the 1960s when Letraset used it on their
                            dry-transfer sheets, and again during the 90s as
                            desktop publishers bundled the text with their
                            software. Today it's seen all around the web; on
                            templates, websites, and stock designs. Use our
                            generator to get your own, or read on for the
                            authoritative history of lorem ipsum.
                        </p>
                        <button className="read-more-btn">Read More</button>
                    </div>
                    <div className="about-us-image">
                        <img src="/pool.jpg" alt="Hotel pool at night" />
                    </div>
                </section>

                <section className="about-us-section reverse">
                    <div className="about-us-image">
                        <img
                            src="/architecture.jpg"
                            alt="Hotel interior or amenity"
                        />
                    </div>
                    <div className="about-us-text">
                        <p>
                            Our hotel offers a perfect blend of luxury and
                            comfort. With state-of-the-art amenities,
                            breathtaking views, and exceptional service, we
                            ensure that every guest experiences an unforgettable
                            stay. From our gourmet restaurants to our relaxing
                            spa facilities, every aspect of our hotel is
                            designed to provide the ultimate retreat for both
                            leisure and business travelers.
                        </p>
                        <button className="read-more-btn">Discover More</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
