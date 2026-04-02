# Requerimientos Técnicos — Lemura

---

## Stack tecnológico

### Backend
| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | v24 | Runtime |
| Express | ^5 | Framework HTTP |
| Prisma ORM | ^5 | Acceso a base de datos |
| SQLite | — | Base de datos (archivo local) |

### Frontend
| Tecnología | Versión | Rol |
|---|---|---|
| React | ^19 | Librería de UI |
| Vite | ^6 | Bundler / dev server |
| CSS puro | — | Estilos (sin librerías UI) |

---

## Modelos de base de datos

### Flor
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Int (PK, autoincrement) | Identificador único |
| `nombre` | String | Nombre de la flor |
| `precio` | Float | Precio unitario |

### Arreglo
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Int (PK, autoincrement) | Identificador único |
| `nombre` | String | Nombre del arreglo |
| `descripcion` | String | Descripción del arreglo |
| `precio` | Float | Precio del arreglo |

---

## Paleta de colores Lemura

| Nombre | Hex | Uso |
|---|---|---|
| Primario (lavanda) | `#7B6EA6` | Navbar, títulos, botones, bordes de cards |
| Fondo (crema) | `#F9F4EF` | Color de fondo general de la página |
| Acento (lila claro) | `#B8A9D4` | Bordes, badges de precio, detalles decorativos |
| Texto (morado oscuro) | `#3D3552` | Texto del cuerpo |
| Blanco | `#FFFFFF` | Fondo de cards y superficies elevadas |

---

## Endpoints de la API

### Flores — `/flores`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/flores` | Obtener todas las flores |
| POST | `/flores` | Crear una flor nueva |
| PUT | `/flores/:id` | Actualizar una flor por ID |
| DELETE | `/flores/:id` | Eliminar una flor por ID |

### Arreglos — `/arreglos`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/arreglos` | Obtener todos los arreglos |
| GET | `/arreglos/:id` | Obtener un arreglo por ID |
| POST | `/arreglos` | Crear un arreglo nuevo |
| PUT | `/arreglos/:id` | Actualizar un arreglo por ID |
| DELETE | `/arreglos/:id` | Eliminar un arreglo por ID |
