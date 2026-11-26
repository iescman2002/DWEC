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
        if (!Number.isInteger(minutos) || minutos < 1) throw new RangeError("Error: Minutos no validos.")
        let minutos_totales = 0; // Obtengo la suma de minutos totales de los puntos
        for (punto of puntos) {
            minutos_totales += minutos_totales + punto.minutos;
        }
        // Si hay mas minutos totales que la duracion
        if (minutos_totales > minutos_totales) {
            throw AgendaNoValidaError(error.minutos, error.duracion);
        }
        // Si la suma delos minutos totales es < que la duración, entonces puedo añadir la planificacion a los puntos
        else {
            this.#puntos.push({nombre, minutos})
        }
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
}