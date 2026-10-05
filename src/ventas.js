// Ventas ejecutadas:
export let ventas = []

// Resumen de las ventas:
export let registroVentasTotales = {
    // Lo inicializo para poder visualizarlo mas fácil (Los valores son reasignados después)
    totalFacturado: 0,
    productoMasVendido: null,
    valorTotalStockRestante: 0,
    existeProductoBajoStock: false,
}


// CALCULAR PRODUCTO MAS VENDIDO
function calcularProductoMasVendido(ventas) {
    // 1. Creo una lista con los productos y la cantidad de veces que se han vendido
    const producto_veces = [] // Lista donde guardaré el id del producto (clave) y la cant de veces que ha sido vendida (valor)
    // 2. Almaceno los productos vendidos y la cantidad de veces vendida
    for (const venta of ventas) { 
        // 3. Buscamos si el producto de cada venta está ya guardado en la lista
        const producto = producto_veces.find(juego => juego.IdProducto === venta.IdProducto) // True o False -> True si idProducto del juego está y False sino
        // 4. Si el producto ya está en la lista:
        if (producto) {
            producto.CantidadVendida += venta.CantidadComprada // Modifico la cantidad del producto con la de la nueva venta
        }
        // 4. Si no esta en la lista lo creamos:
        else {
            producto_veces.push({
                IdProducto: venta.IdProducto,
                CantidadVendida: venta.CantidadComprada
            })
        }
    }
    // Ordeno los productos de menos vendidos a mas
    producto_veces.sort((a,b) => b.CantidadVendida - a.CantidadVendida) // Comparo las cantidades de cada objeto producto_veces ordenandola de forma de mayor a menor
    // Devuelvo el primer producto de la lista, que corresponderá con el producto más vendido (ya que está ordenado de mayor a menor):
    return producto_veces[0] || 0 // Por defecto 0 porques si no hay ventas entonces muestra undefined.
}

// Calcular valor total Stock restante
function valorTotalStockRestante(catalogo){
    return catalogo.reduce((valorTotal, producto) => valorTotal + producto.Precio * producto.Stock, 0) // valorTotal es el acumulador, y el precio total (multiplicado * stock) de cada producto es lo que voy acumulando
}

// Saber si existe algun Producto con Bajo Stock
function bajoStockExistente(catalogo) {
    return catalogo.some(producto => producto.StockBajo===true) // Si existe algún producto con StockBajo, devuelve true sino false
}

export function registrarVenta(catalogo, producto, cantidad) {
    // 1. Válido que haya stock suficiente para hacer la operación
    if (validacionStockSuficiente(producto.Stock, cantidad) === true) {
        // 2. Añado al registro de ventas la que estoy haciendo
        ventas.push({
            IdVenta: ventas.length+1, // El IdVenta es = al tamaño del registro de ventas +1 (si hay 5 ventas el id de venta que registramos será la 5+1)
            IdProducto: producto.Id,
            CantidadComprada: cantidad,
            // En el precio total es donde aplico las tablas A y B del Bloque 3
            PrecioTotal: ajustarPrecioFinal(producto, cantidad)
        })
        // 3. Actualizo el stock del juego tras la compra del productoQ
        actualizarStock(producto, producto.Stock-cantidad)
        // 4. Y lo añado al registro de ventas totales:
        informarNuevaVenta(catalogo)
        console.log("Se ha registrado la venta correctamente.")
    }
    else {
        console.log("No hay stock suficiente para realizar la venta.")
    } 
}

function informarNuevaVenta(catalogo) {
    // Actualizo el objeto registroVentasTotales cada vez que hago una nueva venta
    registroVentasTotales.totalFacturado = ventas.reduce((ingresosTotales, venta) => ingresosTotales + venta.PrecioTotal, 0)
    registroVentasTotales.productoMasVendido = calcularProductoMasVendido(ventas)
    registroVentasTotales.valorTotalStockRestante = valorTotalStockRestante(catalogo)
    registroVentasTotales.existeProductoBajoStock = bajoStockExistente(catalogo)
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
export function actualizarStock(juego, nuevoStock) {
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