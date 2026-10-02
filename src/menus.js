// Bloque 4: Flujo de la aplicación y Menú

export function menuPrincipal(){ // Uso export para poder llamarla desde otro archivo
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
                console.log("PRUEBA")
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
    } while (opcion !== 6)
}