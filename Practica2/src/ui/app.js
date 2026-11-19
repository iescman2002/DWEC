// app.js — Bloque B · ✍️ B4, B5 y B6. Conecta el modelo (el tablero) con la página: pinta, escucha y avisa.
// Usa tus piezas: crearTarjeta/pintarLista, leerFormulario/mostrarErrores y delegar.
// La estructura de la página (ids, data-*) está en index.html y NO se cambia: la usan los tests.
import { ErrorTablero } from "../modelo/errores.js";
import { delegar } from "./delegacion.js";
import { leerFormulario, mostrarErrores } from "./formulario.js";
import { pintarLista } from "./tarjeta.js";

/** Botones de cada tarjeta según su columna: [texto, data-accion] */
const ACCIONES = {
  "Por hacer": [["Empezar →", "empezar"]],
  "En curso": [
    ["← Volver", "volver"],
    ["✓ Completar", "completar"],
  ],
  Hecho: [],
};

// ✍️ B6 · validar(datos) → { campo: "mensaje" } con los errores (objeto vacío si todo está bien)
//   - titulo: obligatorio y como mucho 80 caracteres
//   - cadaDias (si viene): entero mayor que 0. Si es correcto pero no hay limite, el error va
//     en «limite»: una tarea que se repite necesita fecha límite
export function validar(datos) {
  throw new Error("Sin hacer");
}

/**
 * Arranca la interfaz dentro de raiz (el <main id="app">). Los listeners se ponen UNA vez aquí;
 * pintar() solo cambia nodos, así que repintar no los duplica.
 * opciones.hoy: fecha fija para los tests · opciones.alCambiar(tablero): tras cada cambio (UD6)
 */
export function iniciarApp(raiz, tablero, { hoy = null, alCambiar = () => {} } = {}) {
  const form = raiz.querySelector("#form-alta");
  const aviso = raiz.querySelector("#aviso");
  const columnas = raiz.querySelector("#columnas"); // Guarda el section donde se encuentran los divs de columna
  const resumen = raiz.querySelector("#resumen");

  // ✍️ B4 · pintar(): deja la página igual que el modelo cada vez que se llama, y NO pone listeners
  //   - cada columna ([data-columna="…"]): sus tareas en el orden de ordenadas(), con pintarLista en su
  //     .lista, y en cada .tarjeta sus botones según ACCIONES: <button type="button" data-accion="…">
  //   - el .contador de cada columna: (n), o (n/límite) en la que tiene límite WIP
  //   - [data-dato="progreso"]: hechas ÷ total en %, redondeado (con el tablero vacío, 0 %)
  //   - [data-dato="vencidas"]: las vencidas de tablero.resumen(ahora)
  //   La fecha de hoy: const ahora = hoy ?? new Date();  (los tests pasan una fija)
  function pintar() {
    const ahora = hoy ?? new Date(); // Crear la fecha con la que voy a pintar
    const divsColumnas = columnas.querySelectorAll("[data-columna]"); // Guardo como lista los divs del section id Columna para poder trabajar con ellos
    
    for (const divColumna of divsColumnas) { // Recorro los divs de cada columna
      const columna = tablero.columna(divColumna.dataset.columna); // Accedo al objeto columna usando la funcion columna del tablero pasandole el valor del div de columna
      const listaColumna = divColumna.querySelector(".lista"); // Busco en el div de la columna el elemento .lista que voy a pintar
      
      const contadorColumna = divColumna.querySelector(".contador"); // Obtengo el elemento .contador del div Columna 
      // Elemento que muestra las tareas de la columna (si limiteWip existe las muestra en formato "numTareas / limiteWip")
      const numTareasColumna = columna.limiteWip === null ? `(${columna.tareas.length})` : `(${columna.tareas.length}/${columna.limiteWip})`;
      // Añado al .contador de cada columna el texto: numTareasColumna
      contadorColumna.textContent = numTareasColumna;

      const tareasOrdenadas = columna.ordenadas(); // Ordeno cada columna por tareas y lo guardo en una variable
      pintarLista(listaColumna, tareasOrdenadas, ahora); // Pinto cada tarea de la lista sobre la columna que estamos trabajando y creo las tarjetas dentro de pintarLista
       
      // Miro en las acciones la clave que sea igual que columna.nombre y guardo su = [texto, data-accion]
      const accionColumna = ACCIONES[columna.nombre]; // Ej: Si columna -> columna.nombre = "Por hacer" Entonces accionColumna = ["Empezar →", "empezar"]
      // Si la columna tiene acciones (es decir, que no es la columna Hecho que no tiene botones)
      if (accionColumna.length !== 0) {
        // Recorro las tarjetas de la lista sobre la que estamos trabajando para implementar los botones de cada tarea:
        const tarjetas = listaColumna.querySelectorAll(".tarjeta");
        for (const tarjeta of tarjetas) {
          const textoBoton = accionColumna[0][0];
          const accion = accionColumna[0][1];
          const boton = document.createElement("button"); // Creo el boton en el documento
          boton.textContent = textoBoton;
          boton.setAttribute("type","button");
          boton.setAttribute("data-accion",accion);
          tarjeta.append(boton); // Añado el boton a todos los .tarjeta
        }
      }
    }
    // Obtener elementos (los strong) de data-dato="progreso" | data-dato="vencidas"
    const elementoDatoProgreso = resumen.querySelector("[data-dato=progreso]");
    const elementoDatoVencidas = resumen.querySelector("[data-dato=vencidas]");

    // Obtenemos el resumen del tablero para obtener sus datos
    const resumenTablero = tablero.resumen(ahora);
    const numTareasVencidas = resumenTablero["vencidas"]; // Obtengo el numero de tareas vencidas
    const progresoTotal = resumenTablero["enCurso"] + resumenTablero["porHacer"] + resumenTablero["hecho"]; // El 100% del progreso (la suma de todas las tareas menos las vencidas)
    const progresoActual = resumenTablero["hecho"] / (progresoTotal*100); // El % de tareas hechas en relacion con el progreso total (equivalente al 100%)
    
    elementoDatoProgreso.textContent = `${progresoActual} %`;
    elementoDatoVencidas.textContent = numTareasVencidas;
  }

  // 👀 Resuelto: avisar("texto") enseña el aviso; avisar("") lo esconde
  function avisar(mensaje) {
    aviso.textContent = mensaje;
    aviso.hidden = mensaje === "";
  }

  // ✍️ B5 · UN listener, puesto UNA vez aquí (nunca dentro de pintar): clic en los botones de las
  //   tarjetas, con delegar sobre `columnas`. empezar → «En curso», volver → «Por hacer», completar.
  //   Tras cada cambio que sale bien: avisar(""), pintar() y alCambiar(tablero).
  //   Si el tablero lanza un ErrorTablero → avisar(error.message) y no se repinta.
  //   Cualquier otro error → se relanza (es un fallo del programa).
  //   Pista: una función cambiar(accion) con el try/catch te sirve también para el B6.
  
  // Creo la función que le pasaré a delegar, que recibirá la acción del boton (Ej accion: boton = )
  function cambiar(accion) { // ACCION VA A SER UNA TARJETA, ASI PODRÉ ACCEDER A LA TAREA PARA EL ID DE MOVER Y AL BOTON PARA CAMBIAR SU ATRIBUTO
    const boton = accion.querySelector("[data-accion]"); // Obtengo el boton de dentro de la tarjeta
    const eleccion = boton.dataset.accion;
    switch (eleccion) {
      case "empezar": // Si la accion es empezar:
        tablero.mover(0,"En curso") // muevo la tarea a en curso
        eleccion.setAttribute("data-accion","por hacer");
        break;
      case "volver": // Si la accion es volver:
        tablero.mover(1,"Hecho");
        eleccion.setAttribute("data-accion","empezar");
        break;
      case "completar":
        tablero.completar(accion.);
        eleccion.setAttribute("empezar");
        break;
      case "completar": // Si la accion es completar:
        break;
    }
  }
  
  // Obtengo de cada boton la accion que hace cada boton
    delegar(columnas,"click","button[data-accion]", (boton) => { // Delegar recibe el click al clickear en el boton (delegar recibe el boton cuando hago click, el boton hace de evento)
      // MANEJADOR SE TRABAJA DENTRO DEL BOTON
      const tarjeta = boton.target.closest("tarjeta"); // Obtengo la tarjeta donde la que se realiza el trigger
      
      cambiar(tarjeta); // Se la paso a la función cambiar
    }); // Creo el EventListener para cada boton que reciba el click al clickear #columnas (click es el tipo)

  // ✍️ B6 · submit de `form`: preventDefault, leerFormulario, validar y mostrarErrores. Si hay errores,
  //   no se crea nada. Si no, tablero.crearTarea(datos) (como un cambio más) y form.reset().

  pintar();
  return { pintar };
}

(void ACCIONES, ErrorTablero, delegar, leerFormulario, mostrarErrores, pintarLista); // (borra esta línea cuando los uses)
