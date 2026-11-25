// red.js — Bloque C · ✍️ C2. Pedir un JSON con fetch y async/await, sin fiarse de nada.

// ✍️ C2 · async obtenerJSON(url, fetchFn = fetch) → el JSON ya convertido
//   - const respuesta = await fetchFn(url)
//   - Si !respuesta.ok → lanza un Error con el código (respuesta.status) Y la url en el mensaje
//   - Si la cabecera content-type no incluye "application/json" → lanza un Error con la url
//     (Vite devuelve su index.html, con un 200, cuando el fichero no existe)
//   - Si todo va bien, devuelve respuesta.json()
//   - Los errores de red (sin conexión) NO se capturan aquí: que le lleguen a quien llama
export async function obtenerJSON(url, fetchFn = fetch) {
  const respuesta = await fetchFn(url) // Obtengo la respuesta que me da mi navegador con fetch
  if (!respuesta.ok) { // Si el mensaje de respuesta no me devuelve un ok (mensaje 200)
    throw new Error(`${respuesta.status}: ${url}`); // Tiro un error
  }
  // Si la cabecera de la respuesta no incluye application/json:
  if (!respuesta.headers.get("content-type").includes("application/json")) {
    throw new Error(`JSON No válido: ${url}`) // Tiro error
  }
  return respuesta.json() // Devuelvo el json como respuesta
}
