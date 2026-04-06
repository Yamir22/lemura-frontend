import "./ArregloCard.css"

function ArregloCard({ nombre, descripcion, precio, imageUrl }) {
    return (
        <article className="arreglo-card">
            {imageUrl ? (
                <img src={imageUrl} alt={nombre} className="arreglo-card__imagen" />
            ) : (
                <div className="arreglo-card__icono">🌸</div>
            )}
            <h3 className="arreglo-card__nombre">{nombre}</h3>
            <p className="arreglo-card__descripcion">{descripcion}</p>
            <span className="arreglo-card__precio">${precio.toFixed(2)}</span>
        </article>
    )
}

export default ArregloCard
