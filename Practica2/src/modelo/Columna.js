// Columna.js — Bloque A · ✍️ A2: una columna del tablero («Por hacer», «En curso», «Hecho»).
// En kanban, una columna puede tener un límite WIP (Work In Progress): «En curso» no admite más
// de 3 tareas a la vez, para no empezar mil cosas y no acabar ninguna.
import { Tarea } from "./Tarea.js";

export class Columna {
  // Privado: #tareas, un array
  #tareas = [];
  constructor(nombre, limiteWip = null) {
    // 1 · nombre: texto no vacío (sin espacios a los lados) → si no, TypeError
    if (typeof nombre !== "string" || nombre === "") {throw new TypeError("El Nombre introducido no es válido.")};
    //     limiteWip: null (sin límite) o un entero ≥ 1 → si no, RangeError
    if (limiteWip !== null && (!Number.isInteger(limiteWip) || limiteWip < 1)) {
      throw new RangeError("El limiteWip no es válido.")
    }

    this.nombre = nombre.trim();
    this.limiteWip = limiteWip;
  }

  // 2 · get llena: true si hay límite y ya hay tantas tareas como el límite
  get llena() {
    return this.limiteWip !== null && this.limiteWip <= this.#tareas.length ? true : false;
  }
  // 3 · get tareas: una COPIA del array (que nadie pueda tocar el tuyo desde fuera)
  get tareas() {
    return [...this.#tareas]
  }
  // 4 · añadir(tarea): TypeError si no es instanceof Tarea · Error («… está llena …») si está
  //     llena · si no, la guarda y la devuelve
  añadir(tarea) {
    
    if (!(tarea instanceof Tarea)) { // Si la tarea que le pasamos no contiene la estructura del objeto Tarea:
      throw new TypeError("La tarea pasada no es instancia de Tarea.")
    }
    else if (this.llena) { // Si la cola está llena
      throw new Error("La cola de tareas está llena.")
    }
    else {
      this.#tareas.push(tarea);
      return tarea;
    }
  }
  // 5 · quitar(id): la saca del array y la devuelve · Error («… no está …») si no la encuentra
  //     Pista: findIndex + splice
  quitar(id) {
    const posicion = this.#tareas.findIndex(tarea => tarea.id === id);
    if (posicion === -1) {
      throw new Error("El id introducido no está en la lista de tareas.")
    }
    const tareaAEliminar = this.#tareas[posicion];
    this.#tareas.splice(posicion, 1);
    return tareaAEliminar;
  }
  // 6 · tiene(id): true / false. Pista: some
  tiene (id) {
    return this.#tareas.some(tarea => tarea.id === id);
  }
  // 7 · ordenadas(): un array NUEVO ordenado: primero prioridad alta (usa t.peso), y a igual
  //     prioridad, el límite más cercano; las que no tienen límite, al final.
  //     Pista: [...this.#tareas].sort((a, b) => …) — ¿por qué la copia?
}

// Comprueba con:  docker compose run --rm web npm test 3-columna
void Tarea; // (borra esta línea cuando uses Tarea)
