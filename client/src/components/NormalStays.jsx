const NormalStay = (stay, key) => {
    if (!stay) {
        return <div>Stay not found</div>;
    }

    console.log(stay, "from NormalStays.jsx");
    return (
        <div className="normal-stay" key={key}>
            <p>Created at : {stay.date}</p>
            <div className="normal-stay-image">
                <img src={stay.cover} alt={stay.name} />
            </div>
            <div className="normal-stay-info">
                <h3>{stay.name}</h3>
                <p>{stay.description}</p>
            </div>
        </div>
    );
};

export default NormalStay;
