// Importamos las funciones de otros archivos:
import {menuPrincipal} from './menus.js'

// Bloque 2: Creación del catalogo inicial

const catalogoInicial = [ // Se crea con const y no con let porque el catalogo nunca va a ser modificado (sus objetos sí pero eso no afecta al const)
  {
        Id: 1,
        Nombre: "Baldurs Gate 3",
        Plataforma: "PC",
        Categoria: "RPG",
        Precio: 60,
        Estado: "nuevo-precintado",
        Stock: 10
  },
  {
      Id: 2,
      Nombre: "Super Mario World",
      Plataforma: "SNES",
      Categoria: "Plataformas",
      Precio: 35,
      Estado: "usado-como-nuevo",
      Stock: 4
  },
  {
      Id: 3,
      Nombre: "The Legend of Zelda: Ocarina of Time",
      Plataforma: "N64",
      Categoria: "Aventura",
      Precio: 45,
      Estado: "usado-caja-danada",
      Stock: 3
  },
  {
      Id: 4,
      Nombre: "Pokemon Rojo",
      Plataforma: "GAME BOY",
      Categoria: "RPG",
      Precio: 50,
      Estado: "solo-cartucho",
      Stock: 6
  },
  {
      Id: 5,
      Nombre: "Sonic the Hedgehog 2",
      Plataforma: "MEGA DRIVE",
      Categoria: "Plataformas",
      Precio: 30,
      Estado: "usado-como-nuevo",
      Stock: 5
  },
  {
      Id: 6,
      Nombre: "Tekken 3",
      Plataforma: "PS1",
      Categoria: "Lucha",
      Precio: 40,
      Estado: "usado-caja-danada",
      Stock: 2
  },
  {
      Id: 7,
      Nombre: "FIFA 98",
      Plataforma: "PS1",
      Categoria: "Deportes",
      Precio: 20,
      Estado: "solo-cartucho",
      Stock: 7
  },
  {
      Id: 8,
      Nombre: "Tetris",
      Plataforma: "GAME BOY",
      Categoria: "Puzzle",
      Precio: 25,
      Estado: "nuevo-precintado",
      Stock: 3
  },
  {
      Id: 9,
      Nombre: "Street Fighter II",
      Plataforma: "SNES",
      Categoria: "Lucha",
      Precio: 35,
      Estado: "solo-cartucho",
      Stock: 8
  },
  {
      Id: 10,
      Nombre: "Metroid Prime",
      Plataforma: "GameCube",
      Categoria: "Aventura",
      Precio: 40,
      Estado: "usado-como-nuevo",
      Stock: 4
  },
  {
      Id: 11,
      Nombre: "Gran Turismo 2",
      Plataforma: "PS1",
      Categoria: "Deportes",
      Precio: 30,
      Estado: "usado-caja-danada",
      Stock: 5
  },
  {
      Id: 12,
      Nombre: "Chrono Trigger",
      Plataforma: "SNES",
      Categoria: "RPG",
      Precio: 60,
      Estado: "nuevo-precintado",
      Stock: 2
  }
];

// Bloque 3: Reglas de Negocio

// 3.1 (Bloque 3 Tabla A) Actualizo los precios de los juegos del catalogo Inicial según su estado:
for (const juego of catalogoInicial) { // Se accede a cada juego 
    juego.Precio = modificarPrecioSegunEstado(juego.Precio,juego.Estado) // Actualizo el precio según el estado del juego
}
// 3.2 Creo un catalogoActualizado donde los juegos tendrán los mismos atributos que juego a excepcion 
const catalogoActualizado = catalogoInicial.map(juego => ({ // Extraigo los datos para rellenarlo de los objetos (juego) usando map
    ...juego, // Copio todos los atributos iniciales del juego (usando los ...)
    StockBajo: avisarStockBajo(juego) // Si el stock es bajo (<3) asignamos true al nuevo atributo StockBajo, sino pues true
}))

// Función Bloque 3 Tabla A:
function modificarPrecioSegunEstado(precio, estado) {
    // La función devolverá según el estado que reciba el precio modificado.
    switch (estado) {
        case "nuevo-precintado":
            return precio * 1.25
        case "usado-como-nuevo":
            return precio
        case "usado-caja-danada":
            return precio * 0.85
        case "solo-cartucho":
            return precio * 0.70
    }
}
// Función Bloque 3 Tabla C:
function avisarStockBajo(juego) {
    return juego.Stock < 3 // Devuelve true si el Stock es bajo, false si tiene stock suficiente
}


// Menú Principal:
console.log("Bienvenido al Menú Inicial: ")
menuPrincipal(catalogoActualizado)