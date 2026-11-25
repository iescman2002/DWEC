// persistencia.js — Bloque C · ✍️ C5 y C6. Guardar el tablero tras cada cambio y recuperarlo al abrir la página.
// Usa guardar, cargar y borrar (almacen.js, resuelto), tu obtenerJSON (red.js) y Tablero.desdeJSON.
import { Tablero } from "../modelo/Tablero.js";
import { borrar, cargar, guardar } from "./almacen.js";
import { obtenerJSON } from "./red.js";

export const CLAVE = "dwec-p2-tablero";

// ✍️ C5 · guardarTablero(tablero, storage = localStorage): guarda el tablero en CLAVE
export function guardarTablero(tablero, storage = localStorage) {
  guardar(CLAVE, tablero, storage); // Llamo a la funcion guardar de almacen y guardo el tablero el el localStorage.
}

// ✍️ C6 · async arrancar({ storage = localStorage, fetchFn = fetch, url = "/tareas-iniciales.json",
//                  limiteEnCurso = 3 } = {}) → { tablero, origen, error? }
//   Los tres casos («guardado», «inicial» y «vacio») están en el enunciado (bloque C).
export async function arrancar({
  storage = localStorage,
  fetchFn = fetch,
  url = "/tareas-iniciales.json",
  limiteEnCurso = 3,
} = {}) {
  const guardado = cargar(CLAVE, null, storage); // Cargo los datos guardados:

  // Caso 1: Origen guardado -> Hay datos guardados, cargo los datos guardados
  if (guardado !== null) {
    try {
      return {"tablero": Tablero.desdeJSON(guardado), origen: "guardado"};
    }
    // si falla la carga de los datos guardados:
    catch {
      borrar(CLAVE, storage) // Lo borro
    }
  }
  // Caso 2: Origen inicial -> No hay datos guardados, se cargan los datos iniciales
  try {
    const datos = await obtenerJSON(url, fetchFn); // Obtengo los datos iniciales de tareas-iniciales.json
    return {tablero: Tablero.desde(datos, limiteEnCurso), origen: "inicial"};
  }
  // Caso 3: Origen Vacio -> No hay datos iniciales -> No se han podido recoger datos asi que se carga un tablero vacio con los errores
  catch (error) { // Si la promesa es rechazada (al recoger los datos en el await)
    return {tablero: new Tablero(limiteEnCurso), origen: "vacio", error: error.message}; // Devuelvo un tablero vacio con el error.
  }
}

(void Tablero, borrar, cargar, guardar, obtenerJSON); // (borra esta línea cuando los uses)
