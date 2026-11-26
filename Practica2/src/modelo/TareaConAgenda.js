import {AgendaNoValidaError} from "./errores.js";

export class TareaConAgenda extends Tarea {
    
    #duracion;
    #puntos = [];
    constructor(titulo, prioridad, limite, duracion, id = null) {
        super(titulo, prioridad, limite, id);
        if (!Number.isInteger(duracion) || duracion < 1) throw new RangeError("Error: Duración no válida")
        this.duracion = duracion;
    }
    
    planificar(nombre, minutos) {
        if (!Number.isInteger(minutos) || minutos < 1) throw new RangeError("Error: Minutos no validos."); // Válido los minutos que sea entero > 1
        for (const punto of puntos) { // Válido que el nombre no exista ya en el punto
            if (punto.nombre == nombre) {
                throw RangeError("El nombre introducido ya existe.");
            } 
        }
        this.#puntos.push({nombre, minutos});
    }

    get duracion() { // Sin setter para que sea solo de lectura
        return this.#duracion;
    }

    get puntos() {
        return this.#puntos;
    }
    set puntos(valor) {
        this.#puntos = valor;
    }
    comprobarPaso(desde) {
        const total = this.#puntos.reduce((suma, p) => suma + p.minutos, 0);
        if (desde === "Por hacer" && (total === 0 || total > this.#duracion)) throw new AgendaNoValidaError(total, this.#duracion);
  }
}