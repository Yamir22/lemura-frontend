function FlowerCard({ nombre, precio }) {
    return (
        <div style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            width: "150px",
            textAlign: "center"
        }}>
            <h3>{nombre}</h3>
            <p>${precio}</p>
        </div>
    );
}

export default FlowerCard;