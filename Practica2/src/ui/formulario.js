// formulario.js — Bloque B · 👀 leerFormulario (RESUELTO) y ✍️ B2 (mostrarErrores).

// 👀 Resuelto. Del formulario TODO llega como texto: aquí se limpia y se convierte.
/**
 * Lee el formulario de alta y devuelve los datos LIMPIOS para el modelo:
 * { titulo, prioridad, limite, cadaDias }. Texto sin espacios de más, limite "AAAA-MM-DD" o null,
 * cadaDias un número o undefined (si está vacío).
 */
export function leerFormulario(form) {
  const campos = Object.fromEntries(new FormData(form));
  const datos = {
    titulo: (campos.titulo ?? "").trim(),
    prioridad: campos.prioridad,
    limite: campos.limite ? campos.limite : null,
  };
  if (campos.cadaDias?.trim()) datos.cadaDias = Number(campos.cadaDias);
  return datos;
}

// ✍️ B2 · mostrarErrores(form, errores)   errores = { campo: "mensaje" }
//   - Recorre los <p data-error-de="campo"> del formulario (querySelectorAll)
//   - Si ese campo tiene error: el mensaje en el <p> y aria-invalid="true" en el control
//     (el control es form.elements[campo])
//   - Si no lo tiene: <p> vacío y SIN aria-invalid (removeAttribute)
//   Pista: p.dataset.errorDe es el nombre del campo (data-error-de → dataset.errorDe)
export function mostrarErrores(form, errores) {
  // Guardo todos los campos de errores de <p data-error-de="campo">
  const camposErrores = form.querySelectorAll("p[data-error-de]"); // Busca todos los p con la clase data-error-de
  // Recorro cada <p> de los errores
  for (const p of camposErrores) {
    // Guardamos el nombre del campo y el control del formulario
    const campo = p.dataset.errorDe; // Con dataset buscamos los atributos que empiezan por data -> data-error-de -> dataset.errorDe
    const control = form.elements[campo]; // Guardamos el elemento del formulario que coincida con el campo -> campo = limite -> control = date (el input donde se encuentra el campo)
    // Si existe un error con el campo
    if (errores[campo]) {
      p.textContent = errores[campo]; // EL texto del p será el el error del campo
      control.setAttribute("aria-invalid","true"); // Pongo el atributo aria-invalid como true
    }
    // Si no hay error en el campo:
    else {
      p. textContent = ""; // El p vacio
      control.removeAttribute("aria-invalid"); // Y elimino el atributo aria-invalid
    }
  }
}