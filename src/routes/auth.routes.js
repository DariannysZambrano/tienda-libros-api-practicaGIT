import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { User } from '../models/user.model.js'; // Solo para crear un usuario rápido
import bcrypt from 'bcrypt';

const router = Router();

// Ruta temporal para crear un usuario de prueba (Registro rápido)
router.post('/register', async(req, res, next) => {
  try {
    const { username, password, role } = req.body; 

    // Generamos un "salt" (una semilla aleatoria para hacer el hash más seguro)
    const salt = await bcrypt.genSalt(10);
    //creamos el hash
    const passwordHasheada = await bcrypt.hash(password, salt);

    const nuevoUsuario = await User.create({
      username,
      password: passwordHasheada, // Guardamos la version secreta
      role
    });
    res.json({mensaje: "Usuario creado con exito" });
  } catch (error) {
    next(error);
  }
});

router.post('/login' , login);

export default router;