// delegacion.js — Bloque B · ✍️ B3 (delegar).

// ✍️ B3 · delegar(contenedor, tipo, selector, manejador)
//   - UN solo addEventListener, en el contenedor (no en cada botón)
//   - Dentro: el elemento que encaja es evento.target.closest(selector). Si lo hay y está DENTRO
//     del contenedor (contenedor.contains(...)), llama a manejador(elemento, evento)
//   - Devuelve una función que quita el listener (removeEventListener con la MISMA función)
export function delegar(contenedor, tipo, selector, manejador) {
  
  // Contenedor es el padre del cual se mirarán los hijos, así que será el que lleva el EventListener
  // Tipo será el evento que llama al listener (ej: "submit" que es cuando enviamos un formulario)
  // Manejador es la función que con la que respondemos al evento

  if (contenedor.contains(evento.target.closest(selector))) { // Si el contenedor contiene un hijo selector (punto 5):
    contenedor.addEventListener(tipo, manejador); // Creo el listener con el tipo y manejador correspondiente
  }
  // Objetivo:
  // 1. Creo un EventListener en el contenedor (la clase padre: ej: div)
  // 2. El evento salta dependiendo del tipo que le hayamos pasado (ej: al hacer click, al enviar formulario)
  // 3. La función que va a ejecutar el evento es la que le pasamos en el manejador
  // Que pasa: esto ahora mismo solo se ejecuta cuando llamo a contenedor, no cuando lo hago en un hijo del contenedor.
  // Para eso necesito: evento.target.closest(selector) -> Seria punto 4.
  // Que pasa: no se que es evento ni de donde sale
  // 5. Si evento.target.closest(selector) esta dentro de contenedor contenedor.contains(...):
  // llamo al manejador y le paso el elemento (que supongo que lo conseguiré con evento.target.closest(selector))
  // y le paso el evento (que estamos en las mismas sigo sin saber que es evento)
  // 6. Creo una función que sea quitarListener dentro de delegar:
  function quitarEventListener() {
    contenedor.removeEventListener(tipo, manejador);
  }
  // 7. Dentro de quitarListener ejecuto contenedor.removeEventListener() a la que le paso lo mismo que al listener que he creado (tipo, manejador)
  return quitarEventListener;
}