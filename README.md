# RetroStock — Gestor de Inventario y Ventas de Videojuegos Retro

**Asignatura:** Desarrollo Web en Entorno Cliente (DWEC)  
**Curso:** 2026 / 2027  
**Proyecto:** Práctica 01 — UD1 a UD3  

---

## 📖 Descripción del Proyecto

**RetroStock** es una aplicación de consola desarrollada en JavaScript (ES6 Modules) diseñada para gestionar el inventario, ventas y reposiciones de una tienda especializada en videojuegos retro. La aplicación implementa el control de flujo interactivo mediante un menú en bucle, cálculo automatizado de recargos/descuentos según el estado del producto y el volumen de compra, gestión inmutable del catálogo y generación de informes de caja.

---

## 🛠️ Arquitectura y Estructura del Código

El proyecto ha sido estructurado de forma modular dividiendo la responsabilidad de cada fichero para facilitar el mantenimiento y la escalabilidad del código:

```text
retrostock/
├── index.html
├── package.json
├── Dockerfile
├── docker-compose.yml
├── README.md
└── src/
    ├── main.js        # Punto de entrada principal e inicio del programa
    ├── catalogos.js   # Definición del catálogo inicial y generación del catálogo transformado
    ├── filtros.js     # Funciones de búsqueda y filtrado de productos (filter, find)
    ├── ventas.js      # Lógica de registro de ventas, cálculo de precios, stock e informes de caja
    └── menus.js       # Control del flujo de la aplicación, interfaz por consola e interacción con el usuario
```

### Justificación de la organización:
- **`catalogos.js`**: Contiene la constante base de datos inicial (`catalogoInicial`) y exporta el array transformado (`catalogoActualizado`) con los precios ajustados por estado y los identificadores de stock bajo.
- **`filtros.js`**: Agrupa la lógica pura de filtrado y búsqueda (por categoría, ID, título parcial o estado de stock bajo).
- **`ventas.js`**: Concentra las funciones puras y mutaciones seguras del negocio, gestionando el historial de ventas, cálculo de descuentos combinados (Tabla A y B), actualización de inventario y generación del informe global.
- **`menus.js`**: Administra la experiencia de usuario mediante bucles iterativos y estructuras de decisión `switch`.
- **`main.js`**: Actúa como el orquestador principal que inicia la aplicación invocando al menú principal.

---

## 📐 Modelo de Datos

Cada producto del catálogo se representa mediante un objeto con las siguientes propiedades:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `Id` | `Number` | Identificador único del videojuego. |
| `Nombre` | `String` | Título del videojuego. |
| `Plataforma` | `String` | Plataforma de lanzamiento (e.g., PC, SNES, N64, GAME BOY, MEGA DRIVE, PS1, GameCube). |
| `Categoria` | `String` | Género del juego (RPG, Plataformas, Aventura, Lucha, Deportes, Puzzle). |
| `Precio` | `Number` | Precio base original en euros (€). |
| `Estado` | `String` | Estado de conservación. Valores permitidos: `nuevo-precintado`, `usado-como-nuevo`, `usado-caja-danada`, `solo-cartucho`. |
| `Stock` | `Number` | Unidades físicas disponibles. |
| `StockBajo` | `Boolean` | Propiedad calculada: `true` si `Stock < 3`, `false` en caso contrario. |

---

## ⚙️ Reglas de Negocio

El sistema aplica automáticamente las siguientes reglas financieras y de inventario:

### Tabla A: Ajuste según Estado del Producto
Se calcula sobre el `Precio` base del producto:
- **`nuevo-precintado`**: Recargo del +25% (`precioBase * 1.25`)
- **`usado-como-nuevo`**: Sin cambio / +0% (`precioBase * 1.00`)
- **`usado-caja-danada`**: Descuento del -15% (`precioBase * 0.85`)
- **`solo-cartucho`**: Descuento del -30% (`precioBase * 0.70`)

### Tabla B: Descuento por Volumen en una Venta
Se aplica de forma combinada sobre el precio ajustado del producto al realizar una venta:
- **1 unidad**: 0% de descuento.
- **2 a 3 unidades**: 5% de descuento adicional sobre el total.
- **4 o más unidades**: 10% de descuento adicional sobre el total.

### Tabla C: Umbral de Stock Bajo
Cualquier producto cuyo inventario sea **inferior a 3 unidades** (`Stock < 3`) se marca automáticamente con `StockBajo: true` para su advertencia en los informes y listados.

---

## 🔄 Flujo de la Aplicación (Menú)

El menú interactivo opera mediante un bucle `do...while` que evalúa las opciones con la sentencia `switch`:

1. **Ver Catálogo**:
   - *Ver Todo el Catálogo*: Muestra todos los productos mapeados con sus precios ajustados.
   - *Filtrar por categoría*: Extrae categorías únicas y permite listar los juegos pertenecientes a la categoría seleccionada.
   - *Ver productos con Stock Bajo*: Muestra únicamente los juegos con `StockBajo: true`.
2. **Buscar Producto**:
   - Búsqueda exacta por `Id`.
   - Búsqueda por coincidencia de `Título parcial` (ignorecase).
3. **Registrar una Venta**:
   - Solicita `Id` y cantidad.
   - Valida si existe stock suficiente.
   - Calcula el total aplicando la Tabla A y B combinadas.
   - Modifica el inventario manteniendo el principio de inmutabilidad en las estructuras.
   - Registra la transacción e informa al usuario.
4. **Reponer Stock**:
   - Incrementa las unidades de un producto y reevalúa el estado de `StockBajo`.
5. **Informe de Caja**:
   - Muestra el listado de ventas de la sesión.
   - Muestra el resumen global (Total facturado, Producto más vendido, Valor total del stock restante y Alerta si existe stock bajo).
6. **Salir**:
   - Finaliza la ejecución del programa de manera limpia.

---

## 🧪 Casos de Prueba y Verificación Exacta

El programa ha sido verificado contra los casos de prueba obligatorios:

### Caso 1: Chrono Trigger
- **Atributos**: SNES | RPG | Precio Base: 45 € | Estado: `usado-como-nuevo` | Stock Inicial: 4.
- **Operación**: Venta de 3 unidades.
- **Resultado Esperado**:
  - Precio unitario final: **42,75 €** (45 € + 0% Tabla A - 5% Tabla B por 3 unidades).
  - Total de la venta: **128,25 €**.
  - Stock restante: **1 unidad** $\rightarrow$ Marca **`! Stock bajo`** (`StockBajo: true`).

### Caso 2: Streets of Rage 2
- **Atributos**: MEGA DRIVE | Lucha | Precio Base: 60 € | Estado: `nuevo-precintado` | Stock Inicial: 10.
- **Operación**: Venta de 4 unidades.
- **Resultado Esperado**:
  - Precio unitario final: **67,50 €** (60 € + 25% Tabla A = 75 €; 75 € - 10% Tabla B = 67,50 €).
  - Total de la venta: **270,00 €**.
  - Stock restante: **6 unidades** $\rightarrow$ Sin aviso de stock bajo (`StockBajo: false`).

---



## 🚀 Instrucciones de Ejecución con Docker

Para levantar el entorno de desarrollo mediante Docker Compose, únicamente debes ejecutar:

```bash
docker compose up -d
```

Una vez levantado el contenedor:
1. Accede desde tu navegador a `http://localhost:5173`.
2. Abre la consola de herramientas de desarrollador (`F12` o `Ctrl + Shift + I` / `Cmd + Option + I`).
3. Interactúa directamente con los menús de la aplicación mediante la consola.