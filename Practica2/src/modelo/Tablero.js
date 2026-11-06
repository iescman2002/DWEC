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
  buscar(id) {
    const columna = this.dondeEsta(id); // Obtengo la columna donde se encuentra la tarea
    if (columna !== null) {
      const tarea = columna.tareas.find(tarea => tarea.id === id); // Busco la tarea por el id
        if (tarea) { // Si tarea no es null
          return tarea; // Devuelvo la tarea
        }
      //Si no se ha encontrado la tarea, devuelvo null
    }
    return null;
  }

  // dondeEsta(id): la Columna donde está, o null
  dondeEsta(id) {
    const columnas = this.#columnas.values();
    for (const columna of columnas) {
      const tarea = columna.tareas.find(tarea => tarea.id === id); // Busco la tarea por el id
      if (tarea) { // Si tarea no es null (es decir que la ha encontrado)
        return columna; // Devuelvo la columna
      }
    }
    return null; // Si no se ha encontrado la tarea devuelvo null
  }
  // mover(id, destino): Error si no existe la tarea · Error si la columna destino está llena
  //   (¡comprueba ANTES de quitarla de su columna, o se perdería!) · la mueve y la devuelve
  mover(id, destino) {
    // 1. Guardo variables de las columnas en las que voy a trabajar
    const columnaOrigen = this.dondeEsta(id);
    const columnaDestino = this.#columnas.get(destino);
    const tarea = this.buscar(id);
    // 2. Hago las verificaciones antes de trabajar con las tablas
    // 2.1 Verifico que exista la tarea:
    if (tarea === null) { // Si no existe la tarea (la busco y es nula) tiro error
      throw new Error(`Error: no existe la tarea ${id}.`);
    }
    // 2.2 Verifico que la columna introducida exista:
    if (columnaDestino === undefined) {
      throw new Error(`Error: La columna ${destino} no existe.`);
    }
    // 2.2 Verifico que la columna donde voy a mover la tarea no esté llena:
    if (columnaDestino.llena) { // Si la columna de destino ya está llena tiro error
      throw new Error("Error: La columna de destino está llena.");
    }
    // 3. Quito la tarea de su origen
    columnaOrigen.quitar(id);
    // 4. Añado la tarea a la columna de destino
    columnaDestino.añadir(tarea);
    // 5. Devuelvo la tarea añadida
    return tarea
  }
  // completar(id): la mueve a «Hecho» y añade a «Por hacer» lo que devuelva tarea.alCompletar()
  //   ⚠️ Sin preguntar si es recurrente: eso es el polimorfismo
  completar(id) {
    // Obtengo la tarea
    const tarea = this.buscar(id);
    // Muevo la tarea a la columna "Hecho"
    this.mover(id,"Hecho");
    // Recorro la lista de tareas que obtengo al completar una tarea
    const tareasAlCompletar = tarea.alCompletar();
    for (const tareaNueva of tareasAlCompletar) { // Si es Tarea -> tarea.alCompletar() no se ejecuta porque no hay tareas.
      // Añado a la columna "Por hacer" lo que devuelve alCompletar()
      this.#columnas.get("Por hacer").añadir(tareaNueva);
    }
    return tarea;
  }
  // resumen(hoy = new Date()): { porHacer, enCurso, hecho, vencidas }
  //   vencidas = las que estaVencida(hoy) y NO están en «Hecho»
  resumen(hoy = new Date()) {
    // Inicializo el resumen con los datos de las columnas en 0:
    const resumen = {
      "elCurso": 0,
      "hecho": 0,
      "porHacer": 0,
      "vencidas": 0
    };
    // Recorro todas las columnas del tablero
    for (const columna of this.#columnas.values()) {
    // Recorro las tareas de cada columna para ver cual está vencida y cual no
      for (const tarea of columna.tareas) {
        // Si la tarea está vencida:
        if (tarea.estaVencida(hoy)) {
          resumen["vencidas"]++; // Incremento 1 a las tareas vencidas
        }
      }
      // Asigno la longitud de las tareas que hay en la columna a cada columna del resumen.
      resumen[columna.nombre] = columna.tareas.length;
    }
    return resumen;
  }
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
