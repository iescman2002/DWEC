// delegacion.js — Bloque B · ✍️ B3 (delegar).

// ✍️ B3 · delegar(contenedor, tipo, selector, manejador)
//   - UN solo addEventListener, en el contenedor (no en cada botón)
//   - Dentro: el elemento que encaja es evento.target.closest(selector). Si lo hay y está DENTRO
//     del contenedor (contenedor.contains(...)), llama a manejador(elemento, evento)
//   - Devuelve una función que quita el listener (removeEventListener con la MISMA función)
export function delegar(contenedor, tipo, selector, manejador) {
  
  // Contenedor: El elemento padre donde se van a buscar los hijos (ej: div)
  // Tipo: El trigger que hará que salte el evento (ej: click al hacer click, submit al enviar un formulario)
  // Selector: El selector que tiene el elemento que tenemos que buscar (ej: button)
  // Manejador: La función que ejecutararemos cuando el evento cumpla con las elemento que le pasamos
  
  // Creo la función que voy a ejecutar al llamar al evento:
  function funcionDelEvento(evento) { // El evento es lo que le pasa javascript internamente al ejecutar la función en el addEventListener
    const elemento = evento.target.closest(selector); // El elemento será el primer elemento que coincida con el selector indicado
    
    // Si el contenedor contiene como hijo selector el elemento donde se ha producido el evento:
    if (contenedor.contains(elemento)) {
      manejador(elemento, evento); // Ejecuto el manejador con el elemento y la información del evento
    }
  };
  contenedor.addEventListener(tipo, funcionDelEvento); // Creo el listener con el trigger que hará que salte (tipo) y la funcion donde hago las comprobaciones y ejecuta el manejador.
  
    // Función que se encarga de eliminar el listener del evento que hemos creado anteriormente
  function quitarEventListener() {
    contenedor.removeEventListener(tipo, funcionDelEvento);
  }
  // Devuelvo la función de quitar el listener del evento
  return quitarEventListener;
}