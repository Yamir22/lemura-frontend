import { useState, useEffect } from "react"
import ArregloCard from "../components/ArregloCard"
import "./Home.css"

function Home() {
    const [arreglos, setArreglos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/arreglos`)
            .then(res => {
                if (!res.ok) throw new Error("No se pudo conectar con el servidor")
                return res.json()
            })
            .then(data => {
                setArreglos(data)
                setCargando(false)
            })
            .catch(err => {
                setError(err.message)
                setCargando(false)
            })
    }, [])

    return (
        <main className="home">
            <section className="home__hero">
                <h1 className="home__titulo">Nuestro Catálogo</h1>
                <p className="home__subtitulo">
                    Arreglos florales elaborados con amor para cada ocasión
                </p>
            </section>

            {cargando && (
                <p className="home__estado">Cargando arreglos...</p>
            )}

            {error && (
                <p className="home__estado home__estado--error">
                    ⚠️ {error}
                </p>
            )}

            {!cargando && !error && arreglos.length === 0 && (
                <p className="home__estado">
                    Aún no hay arreglos disponibles. ¡Pronto habrá novedades!
                </p>
            )}

            <div className="home__grid">
                {arreglos.map(arreglo => (
                    <ArregloCard
                        key={arreglo.id}
                        nombre={arreglo.nombre}
                        descripcion={arreglo.descripcion}
                        precio={arreglo.precio}
                        imageUrl={arreglo.imageUrl}
                    />
                ))}
            </div>
        </main>
    )
}

export default Home
