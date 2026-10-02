// Bloque 4: Flujo de la aplicación y Menú

export function menuPrincipal(catalogoInicial){ // Uso export para poder llamarla desde otro archivo
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
                verCatalogo(catalogoInicial)
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

function verCatalogo(catalogoInicial){
    let opcion
        do { // Se ejecuta el menu constantemente
        console.log("1. Ver Todo el Catálogo")
        console.log("2. Filtrar por categoría")
        console.log("3. Ver productos con Stock Bajo")
        console.log("4. Volver al menú principal")
        opcion = Number(prompt("Introduzca una opción: "))
        switch (opcion) {
            case 1:
                console.log(catalogoInicial)
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break; 
            default:
                console.log("Opción no válida.")
        }
    } while (opcion !== 1 & opcion !==2 & opcion !==3 & opcion !==4) // Se deja de repetir el bucle cuando no la opcion no sea un numero entre el 1 y el 4
}