import { useState, useEffect, useMemo } from "react"
import "./ArmaTuArreglo.css"

function ArmaTuArreglo() {
    // flores: la lista que viene del backend
    const [flores, setFlores] = useState([])
    // cantidades: objeto donde la clave es el id de la flor y el valor es cuántas se eligieron
    // ejemplo: { 1: 3, 2: 0, 5: 1 }
    const [cantidades, setCantidades] = useState({})
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    // Al montar la página, traemos las flores desde el backend
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/flores`)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo conectar con el servidor")
                return res.json()
            })
            .then(data => {
                setFlores(data)
                // Inicializamos todas las cantidades en 0
                const inicial = {}
                data.forEach(f => { inicial[f.id] = 0 })
                setCantidades(inicial)
                setCargando(false)
            })
            .catch(err => {
                setError(err.message)
                setCargando(false)
            })
    }, [])

    // delta es +1 o -1; Math.max evita que baje de 0
    function cambiarCantidad(id, delta) {
        setCantidades(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }))
    }

    // Solo las flores que el usuario agregó (cantidad > 0)
    // useMemo recalcula únicamente cuando cambian flores o cantidades
    const seleccionadas = useMemo(
        () => flores.filter(f => cantidades[f.id] > 0),
        [flores, cantidades]
    )

    // Suma total: precio × cantidad de cada flor seleccionada
    const total = useMemo(
        () => flores.reduce((acc, f) => acc + (cantidades[f.id] || 0) * f.precio, 0),
        [flores, cantidades]
    )

    return (
        <main className="arma">
            {/* Hero con título de la página */}
            <section className="arma__hero">
                <h1 className="arma__titulo">Arma tu arreglo</h1>
                <p className="arma__subtitulo">
                    Elige las flores y las cantidades que deseas incluir
                </p>
            </section>

            {/* Estados de carga y error */}
            {cargando && <p className="arma__estado">Cargando flores...</p>}
            {error && <p className="arma__estado arma__estado--error">⚠️ {error}</p>}

            {/* Contenido principal: lista de flores + resumen */}
            {!cargando && !error && (
                <div className="arma__layout">

                    {/* Columna izquierda: flores disponibles */}
                    <section className="arma__lista">
                        <h2 className="arma__seccion-titulo">Flores disponibles</h2>

                        {flores.length === 0 && (
                            <p className="arma__estado">No hay flores registradas aún.</p>
                        )}

                        {flores.map(flor => (
                            <div key={flor.id} className="flor-item">
                                <div className="flor-item__info">
                                    <span className="flor-item__nombre">{flor.nombre}</span>
                                    <span className="flor-item__precio">
                                        ${flor.precio.toFixed(2)} c/u
                                    </span>
                                </div>

                                <div className="flor-item__controles">
                                    {/* Botón − deshabilitado cuando la cantidad es 0 */}
                                    <button
                                        className="flor-item__btn"
                                        onClick={() => cambiarCantidad(flor.id, -1)}
                                        disabled={!cantidades[flor.id]}
                                        aria-label={`Quitar ${flor.nombre}`}
                                    >
                                        −
                                    </button>

                                    <span className="flor-item__cantidad">
                                        {cantidades[flor.id] || 0}
                                    </span>

                                    <button
                                        className="flor-item__btn flor-item__btn--add"
                                        onClick={() => cambiarCantidad(flor.id, 1)}
                                        aria-label={`Agregar ${flor.nombre}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Columna derecha: resumen del arreglo */}
                    <aside className="arma__resumen">
                        <h2 className="arma__seccion-titulo">Tu arreglo</h2>

                        {seleccionadas.length === 0 ? (
                            <p className="arma__resumen-vacio">
                                Aún no agregaste flores. ¡Empieza eligiendo!
                            </p>
                        ) : (
                            <ul className="arma__resumen-lista">
                                {seleccionadas.map(f => (
                                    <li key={f.id} className="arma__resumen-item">
                                        <span>{f.nombre} × {cantidades[f.id]}</span>
                                        <span>${(f.precio * cantidades[f.id]).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* El total siempre aparece abajo del resumen */}
                        <div className="arma__total">
                            <span>Total</span>
                            <span className="arma__total-monto">${total.toFixed(2)}</span>
                        </div>
                    </aside>

                </div>
            )}
        </main>
    )
}

export default ArmaTuArreglo
