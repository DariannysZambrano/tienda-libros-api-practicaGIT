export const globalErrorHandler = (err, req, res, next) => {
  // Si el error no tiene un código de estado, le asignamos 500 (Error del servidor)
  const statusCode = err.statusCode || 500;

  console.error(`[ERROR] : ${err.message}`);


  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Algo salio muy mal en el servidor',
    // Solo enviamos el "stack" (donde falló exactamente) si estamos en desarrollo
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
}
