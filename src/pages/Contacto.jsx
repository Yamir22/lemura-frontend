import { useState } from "react"
import "./Contacto.css"

const API = "http://localhost:3000"

function Contacto() {
    // Todos los campos del formulario en un solo objeto de estado
    const [form, setForm] = useState({
        nombreCliente: "",
        email: "",
        telefono: "",
        mensaje: ""
    })

    // true cuando el pedido se envió con éxito → muestra la pantalla de confirmación
    const [enviado, setEnviado] = useState(false)
    // Mensaje de error que se muestra debajo del formulario
    const [error, setError] = useState("")
    // true mientras se espera la respuesta del backend → deshabilita el botón
    const [cargando, setCargando] = useState(false)

    // Cuando cambia cualquier input, actualizamos solo ese campo en el estado
    // [e.target.name] es sintaxis dinámica para la propiedad correspondiente
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setCargando(true)

        try {
            const resp = await fetch(`${API}/pedidos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await resp.json()

            if (!resp.ok) {
                // El backend devolvió un error de validación
                setError(data.error || "No se pudo enviar el pedido. Intenta de nuevo.")
                return
            }

            // Todo salió bien → cambiamos a la pantalla de confirmación
            setEnviado(true)
        } catch {
            // Error de red (el servidor no responde)
            setError("Error de conexión. Verifica que el servidor esté activo.")
        } finally {
            // Siempre quitamos el estado de carga, sin importar el resultado
            setCargando(false)
        }
    }

    // Pantalla de confirmación que reemplaza el formulario tras el envío exitoso
    if (enviado) {
        return (
            <main className="contacto">
                <div className="contacto__confirmacion">
                    <div className="contacto__check">✓</div>
                    <h2>¡Pedido recibido!</h2>
                    <p>
                        Gracias, <strong>{form.nombreCliente}</strong>. Recibimos tu mensaje
                        y nos pondremos en contacto contigo pronto al correo <strong>{form.email}</strong>.
                    </p>
                    <button
                        className="btn btn--primario"
                        onClick={() => {
                            // Reseteamos todo para poder enviar otro pedido
                            setForm({ nombreCliente: "", email: "", telefono: "", mensaje: "" })
                            setEnviado(false)
                        }}
                    >
                        Enviar otro pedido
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="contacto">
            <div className="contacto__contenedor">
                <h1 className="contacto__titulo">Contacto & Pedidos</h1>
                <p className="contacto__subtitulo">
                    Cuéntanos qué tienes en mente y te ayudamos a crear el arreglo perfecto.
                </p>

                <form className="contacto__form" onSubmit={handleSubmit}>
                    <div className="contacto__campo">
                        {/* htmlFor conecta el label con el input por accesibilidad */}
                        <label htmlFor="nombreCliente">Tu nombre</label>
                        <input
                            type="text"
                            id="nombreCliente"
                            name="nombreCliente"
                            value={form.nombreCliente}
                            onChange={handleChange}
                            placeholder="María García"
                            required
                        />
                    </div>

                    <div className="contacto__campo">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="maria@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="contacto__campo">
                        <label htmlFor="telefono">Teléfono <span className="contacto__opcional">(opcional)</span></label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            placeholder="+52 55 1234 5678"
                        />
                    </div>

                    <div className="contacto__campo">
                        <label htmlFor="mensaje">Descripción del pedido</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={form.mensaje}
                            onChange={handleChange}
                            placeholder="Quiero un arreglo de rosas rojas para un cumpleaños..."
                            rows={5}
                            required
                        />
                    </div>

                    {/* El error del backend se muestra aquí */}
                    {error && <p className="contacto__error">{error}</p>}

                    <button
                        type="submit"
                        className="btn btn--primario contacto__btn"
                        disabled={cargando}
                    >
                        {cargando ? "Enviando..." : "Enviar pedido"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Contacto
