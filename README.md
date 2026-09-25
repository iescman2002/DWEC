# DWEC

## RetroStock — Modelo de datos

Cada producto es un objeto con las siguientes propiedades:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `Id` | Number | Identificador único. |
| `Nombre` | String | Nombre del videojuego. |
| `Plataforma` | String | Plataforma del juego. |
| `Categoria` | String | Categoría del videojuego. |
| `Precio` | Number | Precio base. |
| `Estado` | String | Estado de conservación. |
| `Stock` | Number | Unidades disponibles. |

### Estados permitidos

- `nuevo-precintado`
- `usado-como-nuevo`
- `usado-caja-danada`
- `solo-cartucho`

El catálogo inicial se declara con `const` y contiene 12 productos variados.

El catálogo original no se modifica directamente. Las ventas y reposiciones generan un nuevo array mediante `map()` y/o `spread`, evitando `push()`, `splice()` y asignaciones directas.
