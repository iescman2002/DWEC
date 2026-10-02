// Importamos las funciones de otros archivos:
import {productosConStockBajo} from './filtros.js'
import {productosPorCategoria} from './filtros.js'
import {juegosConLaCategoriaEscogida} from './filtros.js'

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
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
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

function juegosFiltradosPorCategoria(juegos) {
    console.log(juegos)
}