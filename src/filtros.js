// Funciones del submenú Catalogo


// 2. Filtrar por Categoría:
export function productosPorCategoria(catalogo) {
    // 1. Necesito saber cuantas categorías distintas tengo
    // 2. Una vez se cuantas categorías distintas tengo que saber el nombre de estas (las categorias)
    // 3. Y guardar En un array los nombres de cada tipo de categoría

    // 3.5 Para saber cuantas categorías tengo puedo inicializar un array vacio llamada categorías
    let categorias = []
    // 3.5 Ahora recorreré todos los juegos que tengo en el catalogo
    for (const juego of catalogo) {
    // 3.5 Y si la categoría del juego que estoy recorriendo no se encuentra dentro de la lista, lo añadiré. Así hasta recorrer todos los juegos
        if (!categorias.includes(juego.Categoria)) {
            categorias.push(juego.Categoria);
        }
    }
    return categorias;
}

// 7. Entonces, aplicamos filter para devolver solo los juegos que coincidan usando filter igual que hemos hecho con StockBajo.
export function juegosConLaCategoriaEscogida(catalogo, categoria) {
    return catalogo.filter(juego => (
        (juego.Categoria === categoria)
    ))
}

// 3. Productos con StockBajo:
export function productosConStockBajo(catalogo){
     // Filtro solo los juegos del catalogo donde StockBajo es true, si StockBajo es false no lo añado a la lista que estoy devolviendo
    return catalogo.filter(juego => (
        juego.StockBajo
    ))
}

// Busqueda por ID de un juego
export function buscarProductoPorId(catalogo, idJuego) {
    return catalogo.find(juego => juego.Id === idJuego) ?? "Juego no encontrado." // Si se ha encontrado la id del juego en el catalogo, devuelve el juego. Sino, devuelve Juego no encontrado
}
// Busqueda por título de un juego
export function buscarProductoPorTitulo(catalogo, tituloABuscar) {
    // trabajo con los titulos tanto en el catalogo como el que le paso en minusculas para facilitar la busqueda de los títulos
    return catalogo.find(juego => juego.Nombre.toLowerCase().includes(tituloABuscar.toLowerCase())) ?? "Juego no encontrado." // Si se ha encontrado un juego que contenga el titulo buscado (no necesariamente todo) dentro del Nombre del juego lo devuelve, sino devuelve juego no encontrado
}