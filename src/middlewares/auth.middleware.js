import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) =>{
  //obtener el token del header 'Authorization'
  //Convencion: 'Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token){
    return res.status(401).json({ mensaje: "Acceso denegado: No hay token" });
  }

  try {
    // 2. Verificar que el token sea auténtico con nuestra palabra secreta
    const cifrado = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Guardar los datos del usuario dentro de 'req' para que el controlador los use
    req.user = cifrado;

    next();
  } catch (error) {
    res.status(403).json({mensaje: "Token  invalido o expirado "});
  }
};

export const esAdmin = (req, res, next) => {
  if(req.user.role !== 'admin'){
    return res.status(403).json({mensaje: "Requieres permisos de administrador" });
  }
  next();
}


// export const checkAdmin = (req, res, next) => {
//   // Buscamos una "clave" en los Headers de la petición
//   const password = req.headers['x-admin-password'];

//   if(password === 'secreto123'){
//     console.log("Acceso concedido");
//     next(); // ¡Adelante! Pasa al controlador
//   }else{
//     console.log("Acceso denegado");
//     // Cortamos el flujo aquí mismo con un error 401 (No autorizado)
//     res.status(401).json({error: "No tienes permiso para hacer esto"});
//   }
// };