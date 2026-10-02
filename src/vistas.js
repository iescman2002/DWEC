// Funciones del submenú Catalogo


// 2. Filtrar por Categoría:

// 3. Productos con StockBajo:
export function productosConStockBajo(catalogo){
     // Filtro solo los juegos del catalogo donde StockBajo es true, si StockBajo es false no lo añado a la lista que estoy devolviendo
    return catalogo.filter(juego => (
        juego.StockBajo
    ))
}