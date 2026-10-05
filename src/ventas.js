
// Inicializo el registro de las ventas

let registroVentas = []

export function registrarVenta(producto, cantidad) {
    // 1. Válido que haya stock suficiente para hacer la operación
    if (validacionStockSuficiente(producto.Stock, cantidad) === true) {
        // 2. Añado al registro de ventas la que estoy haciendo
        registroVentas.push({
            IdVenta: registroVentas.length+1, // El IdVenta es = al tamaño del registro de ventas +1 (si hay 5 ventas el id de venta que registramos será la 5+1)
            IdProducto: producto.Id,
            CantidadComprada: cantidad,
            // En el precio total es donde aplico las tablas A y B del Bloque 3
            PrecioTotal: ajustarPrecioFinal(producto, cantidad)
        })
        // 3. Actualizo el stock del juego tras la compra del productoQ
        actualizarStock(producto, producto.Stock-cantidad)
        console.log("Se ha registrado la venta correctamente.")
    }
    else {
        console.log("No hay stock suficiente para realizar la venta.")
    } 
}

function validacionStockSuficiente(stockJuego, cantidadComprar) {
    return stockJuego >= cantidadComprar // Si hay suficiente stock para realizar la compra True, sino false
}

function ajustarPrecioFinal(juego, cantidadComprada) {
    // Los precios del catalogo con la tabla A (Precio segun Estado) los obtengo directamente al recibir el juego (porque el juego lo obtengo desde catalogoActualizado)
    // Tabla B Descuento sobre una misma compra:
    if (cantidadComprada === 1) {
        return juego.Precio * cantidadComprada; // Si solo compra 1 juego, no se aplica descuento
    }
    else if (cantidadComprada === 2 || cantidadComprada === 3) {
                return (juego.Precio * cantidadComprada) * 0.95; // Si compra 2 o 3 unidades el descuento será del 5%
    }
    else if (cantidadComprada >= 4) {
        return (juego.Precio * cantidadComprada) * 0.90; // Si compra 4 o más se aplica un descuento del 10%
    }
}

// funcion que actualiza stock tras venta
function actualizarStock(juego, nuevoStock) {
    juego.Stock = nuevoStock
    // Si el stock del juego pasa a ser < 3 lo marcamos como bajo stock
    if (juego.Stock < 3) {
        juego.StockBajo = true
    }
    // Si es > 3 entonces el StockBajo será false
    else {
        juego.StockBajo = false
    }
}

// Registro de Caja (Función para ver los registros de Venta realizados en esta sesión)
export function verInformeDeCaja() {
    console.log(registroVentas)
}