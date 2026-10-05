// Importamos las funciones de otros archivos:
import {juegosConLaCategoriaEscogida, productosPorCategoria, buscarProductoPorTitulo, buscarProductoPorId, productosConStockBajo} from './filtros.js'
import {actualizarStock, verInformeDeCaja, registrarVenta} from './ventas.js'
// Bloque 4: Flujo de la aplicación y Menú

export function menuPrincipal(catalogo){ // Uso export para poder llamarla desde otro archivo
    let opcion; // Defino la función como una variable con un valor que cambiará (let)
    
    do { // Se ejecuta el menu constantemente
        console.log("1. Ver Catálogo")
        console.log("2. Buscar Producto")
        console.log("3. Registrar una Venta")
        console.log("4. Reponer Stock")
        console.log("5. Informe de Caja")
        console.log("6. Salir")
        opcion = Number(prompt("Introduzca una opción: "))
        switch (opcion) {
            case 1:
                console.log("Ha elegido ver el catalogo:")
                verCatalogo(catalogo)
                break;
            case 2:
                console.log("Ha elegido buscar un producto: ")
                menuBuscarProducto(catalogo)
                break;
            case 3:
                console.log("Ha elegido registrar una venta:")
                menuRegistrarVenta(catalogo)
                break;
            case 4:
                console.log("Ha elegido reponer stock de un producto:")
                menuReponerStock(catalogo)
                break;
            case 5:
                console.log("Ha elegido ver el Informe de la Caja:")
                verInformeDeCaja()
                break;
            case 6: 
                break;
            default:
                console.log("Opción no válida.")
        }
    } while (opcion !== 6) // Se deja de repetir el bucle una vez el usuario introduzca 6 (Salir).
}

function verCatalogo(catalogo){
    let opcion
        do { // Se ejecuta el menu constantemente
        console.log("1. Ver Todo el Catálogo")
        console.log("2. Filtrar por categoría")
        console.log("3. Ver productos con Stock Bajo")
        console.log("4. Volver al menú principal")
        opcion = Number(prompt("Introduzca una opción: "))
        switch (opcion) {
            case 1:
                console.log(catalogo)
                break;
            case 2:
                console.log("De las siguientes categorías:")
                mostrarSeleccionCategoria(catalogo, productosPorCategoria(catalogo))
                break;
            case 3:
                console.log("Los productos que tienen un Stock Bajo actualmente son:")
                console.log(productosConStockBajo(catalogo))
                break;
            case 4:
                console.log("Ha elegido volver al menú principal:")
                break; 
            default:
                console.log("Opción no válida.")
        }
    } while (opcion !== 1 & opcion !==2 & opcion !==3 & opcion !==4) // Se deja de repetir el bucle cuando no la opcion no sea un numero entre el 1 y el 4
}

// Subcatalogo para elegir las categorias:
function mostrarSeleccionCategoria(catalogo, categorias){
    // 4. Una vez tengo la lista de categorías, muestro en pantalla un menú con un for preguntando por pantalla cual de todas las categorías queremos filtrar
    categorias.forEach((categoria, posicion) => {
        console.log(`${posicion + 1}. ${categoria}`);
    });
    // 5. Entonces guardamos la posición en la que se encuentra la categoría escogida
    const posicionCategoriaEscogida = Number(prompt("Introduce por cual de ellas le gustaría filtrar:"))-1
    // 6. Y una vez tenemos la posición tenemos la categoría
    const categoriaEscogida = categorias[posicionCategoriaEscogida]
    // 7. Entonces, aplicamos filter para devolver solo los juegos que coincidan usando filter igual que hemos hecho con StockBajo.
    juegosFiltradosPorCategoria(juegosConLaCategoriaEscogida(catalogo, categoriaEscogida))
}

// Devuelve los juegos filtrados por categoría
function juegosFiltradosPorCategoria(juegos) {
    console.log(juegos)
}

// Menu Para buscar produtos
function menuBuscarProducto(catalogo) {
    let opcion;
    do {
    console.log("1. Por Id.")
    console.log("2. Por el título parcial.")
    console.log("3. Volver al menú principal.")
    opcion = Number(prompt("Introduzca como quiere buscar por el producto: "))
        switch (opcion) {
            case 1:
                console.log("Ha elegido buscar por el Id:")
                const idBusqueda = Number(prompt("Introduzca a continuación el Id: "))
                console.log(buscarProductoPorId(catalogo, idBusqueda))
                opcion = 3;
                break;
            case 2:
                console.log("Ha elegido buscar por el titulo: ")
                const tituloBusqueda = prompt("Introduzca a continuación lo que sepas del título: ")
                buscarProductoPorTitulo(catalogo, tituloBusqueda)
                console.log(buscarProductoPorTitulo(catalogo,tituloBusqueda))
                opcion = 3;
                break;
        }
    } while (opcion !==3)
}

// Menu Registrar Venta
function menuRegistrarVenta(catalogo) {
    // Imprimo los juegos del catalogo para ver cual voy a registrar:
    console.log(catalogo)
    const idJuego = Number(prompt("Introduzca el Id del juego del cual se va a realizar la compra:"))
    const cantCompra = Number(prompt("Introduzca cuantos juegos va a comprar:"))
    // Teniendo el idJuego obtengo el juego para el registroVenta
    const producto = catalogo.find(juego => juego.Id === idJuego)
    registrarVenta(producto, cantCompra)
}

// Menu Reponer Stock
function menuReponerStock(catalogo) {
    // Imprimimos los productos
    console.log(catalogo)
    // Obtenemos el producto a actualizar
    const idProducto = Number(prompt("Introduce el Id del producto a reponer:"))
    const producto = catalogo.find(juego => juego.Id === idProducto)
    // Y la cantidad
    const cantReponer = Number(prompt("Introduce la cantidad de stock que va a reponer:"))
    
    // Y actualizamos el stock
    actualizarStock(producto, producto.Stock + cantReponer)
    console.log("Stock actualizado")
}