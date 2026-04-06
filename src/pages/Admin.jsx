import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import "./Admin.css"

// La URL base de nuestra API en el backend
const API = import.meta.env.VITE_API_URL

function Admin() {
    // Controla qué pestaña está visible: "flores" o "arreglos"
    const [seccion, setSeccion] = useState("flores")

    // ── Estado para la sección de Flores ──────────────────────────────
    const [flores, setFlores] = useState([])
    // Los valores del formulario de flores
    const [florForm, setFlorForm] = useState({ nombre: "", precio: "" })
    // Si estamos editando, guardamos el id de la flor; si no, es null
    const [editandoFlorId, setEditandoFlorId] = useState(null)
    // Mensaje de error del formulario de flores
    const [errorFlor, setErrorFlor] = useState("")

    // ── Estado para la sección de Arreglos ────────────────────────────
    const [arreglos, setArreglos] = useState([])
    const [arregloForm, setArregloForm] = useState({ nombre: "", descripcion: "", precio: "", imageUrl: "" })
    const [editandoArregloId, setEditandoArregloId] = useState(null)
    const [errorArreglo, setErrorArreglo] = useState("")
    // Archivo de imagen seleccionado (objeto File del input)
    const [imagenArchivo, setImagenArchivo] = useState(null)
    // true mientras se sube la imagen a Supabase Storage
    const [subiendoImagen, setSubiendoImagen] = useState(false)

    // useEffect: se ejecuta una sola vez al montar la página
    // Carga los datos iniciales de ambas secciones
    useEffect(() => {
        cargarFlores()
        cargarArreglos()
    }, [])

    // ── Funciones de Flores ────────────────────────────────────────────

    // Pide la lista de flores al backend y actualiza el estado
    const cargarFlores = async () => {
        const resp = await fetch(`${API}/flores`)
        const data = await resp.json()
        setFlores(data)
    }

    // Maneja el envío del formulario de flores (crear O editar según editandoFlorId)
    const guardarFlor = async (e) => {
        e.preventDefault() // Evita que la página se recargue
        setErrorFlor("")
        const method = editandoFlorId ? "PUT" : "POST"
        const url = editandoFlorId
            ? `${API}/flores/${editandoFlorId}`
            : `${API}/flores`

        const resp = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: florForm.nombre, precio: Number(florForm.precio) })
        })
        const data = await resp.json()

        // Si el backend respondió con error (ej. validación fallida), mostramos el mensaje
        if (!resp.ok) {
            setErrorFlor(data.error || "Error al guardar la flor")
            return
        }

        // Éxito: limpiamos el formulario y recargamos la lista
        setFlorForm({ nombre: "", precio: "" })
        setEditandoFlorId(null)
        cargarFlores()
    }

    // Rellena el formulario con los datos de la flor seleccionada para editar
    const editarFlor = (flor) => {
        setFlorForm({ nombre: flor.nombre, precio: String(flor.precio) })
        setEditandoFlorId(flor.id)
        setErrorFlor("")
        // Hacemos scroll al tope para que el usuario vea el formulario
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const eliminarFlor = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta flor?")) return
        await fetch(`${API}/flores/${id}`, { method: "DELETE" })
        cargarFlores()
    }

    // Cancela la edición y deja el formulario vacío
    const cancelarEdicionFlor = () => {
        setFlorForm({ nombre: "", precio: "" })
        setEditandoFlorId(null)
        setErrorFlor("")
    }

    // ── Funciones de Arreglos ──────────────────────────────────────────

    const cargarArreglos = async () => {
        const resp = await fetch(`${API}/arreglos`)
        const data = await resp.json()
        setArreglos(data)
    }

    const guardarArreglo = async (e) => {
        e.preventDefault()
        setErrorArreglo("")

        // Si hay un archivo nuevo seleccionado, primero lo subimos a Supabase Storage
        let imageUrl = arregloForm.imageUrl || null
        if (imagenArchivo) {
            setSubiendoImagen(true)
            const extension = imagenArchivo.name.split(".").pop()
            const nombreArchivo = `arreglo-${Date.now()}.${extension}`

            const { error: uploadError } = await supabase.storage
                .from("arreglos")
                .upload(nombreArchivo, imagenArchivo, { upsert: true })

            setSubiendoImagen(false)

            if (uploadError) {
                setErrorArreglo("Error al subir la imagen: " + uploadError.message)
                return
            }

            // Obtenemos la URL pública permanente del archivo subido
            const { data: urlData } = supabase.storage.from("arreglos").getPublicUrl(nombreArchivo)
            imageUrl = urlData.publicUrl
        }

        const method = editandoArregloId ? "PUT" : "POST"
        const url = editandoArregloId
            ? `${API}/arreglos/${editandoArregloId}`
            : `${API}/arreglos`

        const resp = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: arregloForm.nombre,
                descripcion: arregloForm.descripcion,
                precio: Number(arregloForm.precio),
                imageUrl
            })
        })
        const data = await resp.json()

        if (!resp.ok) {
            setErrorArreglo(data.error || "Error al guardar el arreglo")
            return
        }

        setArregloForm({ nombre: "", descripcion: "", precio: "", imageUrl: "" })
        setImagenArchivo(null)
        setEditandoArregloId(null)
        cargarArreglos()
    }

    const editarArreglo = (arreglo) => {
        setArregloForm({
            nombre: arreglo.nombre,
            descripcion: arreglo.descripcion,
            precio: String(arreglo.precio),
            imageUrl: arreglo.imageUrl || ""
        })
        setImagenArchivo(null)
        setEditandoArregloId(arreglo.id)
        setErrorArreglo("")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const eliminarArreglo = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este arreglo?")) return
        await fetch(`${API}/arreglos/${id}`, { method: "DELETE" })
        cargarArreglos()
    }

    const cancelarEdicionArreglo = () => {
        setArregloForm({ nombre: "", descripcion: "", precio: "", imageUrl: "" })
        setImagenArchivo(null)
        setEditandoArregloId(null)
        setErrorArreglo("")
    }

    // ── Render ─────────────────────────────────────────────────────────
    return (
        <main className="admin">
            <h1 className="admin__titulo">Panel de Administración</h1>

            {/* Pestañas para cambiar de sección */}
            <div className="admin__tabs">
                <button
                    className={`admin__tab ${seccion === "flores" ? "admin__tab--activo" : ""}`}
                    onClick={() => setSeccion("flores")}
                >
                    🌸 Flores
                </button>
                <button
                    className={`admin__tab ${seccion === "arreglos" ? "admin__tab--activo" : ""}`}
                    onClick={() => setSeccion("arreglos")}
                >
                    💐 Arreglos
                </button>
            </div>

            {/* ── Sección Flores ─────────────────────────────────────── */}
            {seccion === "flores" && (
                <section className="admin__seccion">
                    <h2>{editandoFlorId ? "✏️ Editar flor" : "➕ Agregar flor"}</h2>

                    <form className="admin__form" onSubmit={guardarFlor}>
                        <div className="admin__campo">
                            <label htmlFor="florNombre">Nombre</label>
                            <input
                                id="florNombre"
                                type="text"
                                value={florForm.nombre}
                                onChange={e => setFlorForm({ ...florForm, nombre: e.target.value })}
                                placeholder="Rosa, Girasol, Tulipán..."
                            />
                        </div>
                        <div className="admin__campo">
                            <label htmlFor="florPrecio">Precio ($)</label>
                            <input
                                id="florPrecio"
                                type="number"
                                value={florForm.precio}
                                onChange={e => setFlorForm({ ...florForm, precio: e.target.value })}
                                placeholder="0.00"
                                min="0.01"
                                step="0.01"
                            />
                        </div>

                        {/* El error del backend se muestra aquí en rojo */}
                        {errorFlor && <p className="admin__error">{errorFlor}</p>}

                        <div className="admin__botones">
                            <button type="submit" className="btn btn--primario">
                                {editandoFlorId ? "Guardar cambios" : "Agregar flor"}
                            </button>
                            {/* El botón cancelar solo aparece cuando estamos editando */}
                            {editandoFlorId && (
                                <button type="button" className="btn btn--secundario" onClick={cancelarEdicionFlor}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>

                    <h3 className="admin__subtitulo">Flores registradas ({flores.length})</h3>
                    <ul className="admin__lista">
                        {flores.length === 0 && (
                            <li className="admin__vacio">No hay flores registradas aún.</li>
                        )}
                        {flores.map(flor => (
                            <li key={flor.id} className="admin__item">
                                <span className="admin__item-nombre">{flor.nombre}</span>
                                <span className="admin__item-precio">${flor.precio.toFixed(2)}</span>
                                <div className="admin__item-acciones">
                                    <button className="btn btn--editar" onClick={() => editarFlor(flor)}>
                                        Editar
                                    </button>
                                    <button className="btn btn--eliminar" onClick={() => eliminarFlor(flor.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* ── Sección Arreglos ───────────────────────────────────── */}
            {seccion === "arreglos" && (
                <section className="admin__seccion">
                    <h2>{editandoArregloId ? "✏️ Editar arreglo" : "➕ Agregar arreglo"}</h2>

                    <form className="admin__form" onSubmit={guardarArreglo}>
                        <div className="admin__campo">
                            <label htmlFor="arregloNombre">Nombre</label>
                            <input
                                id="arregloNombre"
                                type="text"
                                value={arregloForm.nombre}
                                onChange={e => setArregloForm({ ...arregloForm, nombre: e.target.value })}
                                placeholder="Arreglo primaveral..."
                            />
                        </div>
                        <div className="admin__campo">
                            <label htmlFor="arregloDescripcion">Descripción</label>
                            <textarea
                                id="arregloDescripcion"
                                value={arregloForm.descripcion}
                                onChange={e => setArregloForm({ ...arregloForm, descripcion: e.target.value })}
                                placeholder="Descripción del arreglo floral..."
                                rows={3}
                            />
                        </div>
                        <div className="admin__campo">
                            <label htmlFor="arregloPrecio">Precio ($)</label>
                            <input
                                id="arregloPrecio"
                                type="number"
                                value={arregloForm.precio}
                                onChange={e => setArregloForm({ ...arregloForm, precio: e.target.value })}
                                placeholder="0.00"
                                min="0.01"
                                step="0.01"
                            />
                        </div>
                        <div className="admin__campo">
                            <label htmlFor="arregloImagen">Imagen</label>
                            {/* Si el arreglo ya tiene imagen, mostramos un preview */}
                            {arregloForm.imageUrl && !imagenArchivo && (
                                <img
                                    src={arregloForm.imageUrl}
                                    alt="Imagen actual"
                                    className="admin__imagen-preview"
                                />
                            )}
                            <input
                                id="arregloImagen"
                                type="file"
                                accept="image/*"
                                onChange={e => setImagenArchivo(e.target.files[0] || null)}
                            />
                            {imagenArchivo && (
                                <span className="admin__imagen-nombre">📎 {imagenArchivo.name}</span>
                            )}
                        </div>

                        {errorArreglo && <p className="admin__error">{errorArreglo}</p>}

                        <div className="admin__botones">
                            <button type="submit" className="btn btn--primario" disabled={subiendoImagen}>
                                {subiendoImagen ? "Subiendo imagen..." : editandoArregloId ? "Guardar cambios" : "Agregar arreglo"}
                            </button>
                            {editandoArregloId && (
                                <button type="button" className="btn btn--secundario" onClick={cancelarEdicionArreglo}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>

                    <h3 className="admin__subtitulo">Arreglos registrados ({arreglos.length})</h3>
                    <ul className="admin__lista">
                        {arreglos.length === 0 && (
                            <li className="admin__vacio">No hay arreglos registrados aún.</li>
                        )}
                        {arreglos.map(arreglo => (
                            <li key={arreglo.id} className="admin__item">
                                {arreglo.imageUrl && (
                                    <img
                                        src={arreglo.imageUrl}
                                        alt={arreglo.nombre}
                                        className="admin__item-imagen"
                                    />
                                )}
                                <div className="admin__item-info">
                                    <span className="admin__item-nombre">{arreglo.nombre}</span>
                                    {arreglo.descripcion && (
                                        <span className="admin__item-descripcion">{arreglo.descripcion}</span>
                                    )}
                                </div>
                                <span className="admin__item-precio">${arreglo.precio.toFixed(2)}</span>
                                <div className="admin__item-acciones">
                                    <button className="btn btn--editar" onClick={() => editarArreglo(arreglo)}>
                                        Editar
                                    </button>
                                    <button className="btn btn--eliminar" onClick={() => eliminarArreglo(arreglo.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    )
}

export default Admin
