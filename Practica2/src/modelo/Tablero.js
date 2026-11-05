// Tablero.js — Bloque A · ✍️ A3 (el tablero) y A5 (reglas).
// En el bloque C volverás aquí para ✍️ C4 (toJSON y desdeJSON).
// El tablero TIENE tres columnas: es composición, no hereda de nadie.
import { Columna } from "./Columna.js";
import { ColumnaLlenaError, MovimientoNoPermitidoError } from "./errores.js";
import { Tarea } from "./Tarea.js";
import { TareaRecurrente } from "./TareaRecurrente.js";
import { aDatos, desdeDatos } from "./serializar.js";

export class Tablero {
  static COLUMNAS = Object.freeze(["Por hacer", "En curso", "Hecho"]);
  static VERSION_DATOS = 1; // (bloque C) si algún día cambia el formato guardado, se sube
  // Privado: #columnas, un Map nombre → Columna
  #columnas;
  // ✍️ A3 ──────────────────────────────────────────────────────────────────────
  constructor(limiteEnCurso = 3) {
    this.#columnas = new Map();
    // Crea las tres columnas; solo «En curso» lleva límite WIP (limiteEnCurso)
    for (const columna of Tablero.COLUMNAS) { // Recorro los 3 tipos de columnas existentes (la llamo mediante el objeto tablero porque es un atributo estatico)
      const obj_columna = columna === "En curso" ? new Columna(columna, limiteEnCurso) : new Columna(columna); // Creo el objeto columna, Si la columna es En curso le establezco limiteWIP, sino sin limite.
      this.#columnas.set(columna, obj_columna); // Le añado como clave el tipo de columna y como valor la columna propia
    }
  }

  // static desde(datos, limiteEnCurso): un Tablero con una tarea por cada objeto de datos
  //   (usa crearTarea)
  static desde(datos, limiteEnCurso) {
    // 1. Creo el tablero
    const tablero = new Tablero(limiteEnCurso);
    // 2. Creo una tarea por cada dato
    for (const dato of datos) {
      const tarea = tablero.crearTarea(dato);
      // 3. Añado la tarea al Tablero añadiendondolo a la Columna de "Por hacer" (equivalente a la posicion [0] de columnas)
      tablero.columnas[0].añadir(tarea);
    }
    // 4. Devuelvo el tablero
    return tablero;
  }
  // columna(nombre): la Columna, o un Error si no existe (que el mensaje lleve el nombre)
  columna(nombre) {
    // Buscar en el mapa columnas la clave columna que sea === a nombre
    const columnaEncontrada = this.#columnas.has(nombre);
    if (!columnaEncontrada) { // Si no se ha encontrado columna (columnaEncontrada = False) -> Devuelve el error
      throw new Error(`Error: No se ha encontrado el nombre ${nombre} de la columna.`);
    }
    else { // Si se ha encontrado una columna (columnaEncontrada = True) -> Devuelve la columna encontrada
      return this.#columnas.get(nombre);
    }
  }
  // get columnas: array con las tres columnas, en orden
  get columnas() {
    return [...this.#columnas.values()]
  }
  // crearTarea(datos): TareaRecurrente si datos trae cadaDias, Tarea si no → a «Por hacer»
  //   y la devuelve. datos es un objeto { titulo, prioridad, limite, cadaDias }: saca cada campo
  //   y pásaselo al constructor, en su orden (new Tarea(datos) NO vale: espera el título)
  crearTarea(datos) {
    let tarea = undefined
    if (datos["cadaDias"] !== undefined) { // Si los datos traen cadaDias -> creo TareaRecurrente
      tarea = new TareaRecurrente(datos["titulo"],datos["prioridad"],datos["limite"],datos["cadaDias"])
    }
    else { // Si los datos no traen cadaDias -> creo Tarea 
      tarea = new Tarea(datos["titulo"],datos["prioridad"],datos["limite"])
    }
    return tarea;
  }

  // buscar(id): la tarea, esté en la columna que esté, o null
  // dondeEsta(id): la Columna donde está, o null

  // mover(id, destino): Error si no existe la tarea · Error si la columna destino está llena
  //   (¡comprueba ANTES de quitarla de su columna, o se perdería!) · la mueve y la devuelve

  // completar(id): la mueve a «Hecho» y añade a «Por hacer» lo que devuelva tarea.alCompletar()
  //   ⚠️ Sin preguntar si es recurrente: eso es el polimorfismo

  // resumen(hoy = new Date()): { porHacer, enCurso, hecho, vencidas }
  //   vencidas = las que estaVencida(hoy) y NO están en «Hecho»

  // ✍️ A5 · Reglas (vuelves a mover y completar) ─────────────────────────────────
  //   - Columna llena → ColumnaLlenaError (en vez de un Error cualquiera)
  //   - Sacar una tarea de «Hecho», o «moverla» a la columna en la que ya está →
  //     MovimientoNoPermitidoError. Todo se comprueba ANTES de tocar nada.
  //   Pista: mover y completar hacen casi lo mismo. Un método privado #trasladar(id, destino)
  //   con las comprobaciones evita escribirlas dos veces.

  // ✍️ C4 (bloque C) ────────────────────────────────────────────────────────────
  // toJSON(): { version, limiteEnCurso, columnas: { "Por hacer": [datos…], … } }
  //   JSON.stringify(tablero) lo llama solo. Sin él sale "{}": los # no se ven. Usa aDatos.

  /** Lo contrario de toJSON: el MISMO tablero (columnas, ids y límite WIP). Lanza si no encaja. */
  static desdeJSON(datos) {
    throw new Error("Sin hacer");
  }
}

// Comprueba con:  docker compose run --rm web npm test bloque-a
(void Columna,
  ColumnaLlenaError,
  MovimientoNoPermitidoError,
  Tarea,
  TareaRecurrente,
  aDatos,
  desdeDatos); // (borra esta línea cuando los uses)
