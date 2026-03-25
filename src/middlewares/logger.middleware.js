// Un middleware siempre tiene req, res y NEXT
export const logger = (req, res, next) => {
  const fecha = new Date().toLocaleString();
  console.log(`[${fecha}] Peticion recibida: ${req.method} en ${req.url}`);

  // ¡VITAL! Si no llamas a next(), la petición se queda "colgada" y nunca llega al controlador.
  next();
}