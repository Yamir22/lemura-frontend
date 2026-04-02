import "./ArregloCard.css"

function ArregloCard({ nombre, descripcion, precio }) {
    return (
        <article className="arreglo-card">
            <div className="arreglo-card__icono">🌸</div>
            <h3 className="arreglo-card__nombre">{nombre}</h3>
            <p className="arreglo-card__descripcion">{descripcion}</p>
            <span className="arreglo-card__precio">${precio.toFixed(2)}</span>
        </article>
    )
}

export default ArregloCard
