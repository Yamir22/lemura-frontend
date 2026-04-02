# Plan de Desarrollo — Lemura

Tienda de arreglos de flores construida con Node.js + Express + Prisma + SQLite en el backend y React + Vite en el frontend.

---

## Fase 1 — Base funcional ✅ (completada)

**Objetivo:** tener el backend corriendo con persistencia real de datos y poder probarlo con Bruno.

### Qué se hizo
- Proyecto Express con estructura `routes / controllers / middleware`
- Configuración de Prisma 5 con SQLite y primera migración
- Modelo `Flor` con campos `id`, `nombre`, `precio`
- CRUD completo para flores: GET, POST, PUT, DELETE
- Middleware global de manejo de errores
- Colección Bruno con las peticiones HTTP para probar cada endpoint

---

## Fase 2 — Diseño Lemura + catálogo de arreglos 🚧 (esta fase)

**Objetivo:** agregar el modelo principal del negocio y mostrar el catálogo con la identidad visual de la marca.

### Qué se hizo
- Nuevo modelo `Arreglo` con campos `id`, `nombre`, `descripcion`, `precio`
- CRUD completo para arreglos en el backend
- Frontend React rediseñado con la paleta Lemura (lavanda, crema, lila)
- Navbar con nombre de marca y tagline
- Página principal con grid responsive de cards de arreglos
- Consumo del backend via `fetch`
- CSS puro con variables (sin librerías UI externas)

---

## Fase 3 — Armador de arreglo personalizado

**Objetivo:** permitir al usuario componer su propio arreglo eligiendo flores individuales.

### Lo que se planifica
- Selector de flores con cantidad por cada tipo
- Cálculo dinámico del total en tiempo real
- Vista previa del arreglo armado
- Botón para guardar/pedir el arreglo personalizado

---

## Fase 4 — Funcionalidades avanzadas

**Objetivo:** completar la experiencia de tienda con administración, visuales y flujo de pedido.

### Lo que se planifica
- Panel de administración para crear/editar/eliminar arreglos y flores
- Subida y visualización de imágenes por arreglo
- Validaciones en formularios (frontend y backend)
- Formulario de pedido con datos del cliente
- Confirmación de pedido con resumen
