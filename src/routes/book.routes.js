import { Router } from "express";
import { obtenerLibros, crearLibros, obtenerLibroPorId } from "../controllers/book.controller.js";
import { verificarToken, esAdmin } from "../middlewares/auth.middleware.js"; // Importamos
import { actualizarLibro, eliminarLibro } from "../controllers/book.controller.js";

const router = Router();

// Cuando alguien entre a la raíz de "libros", ejecuta la función del controlador


router.get('/', verificarToken, obtenerLibros);

// Actualizar (Requiere Token y ser Admin)
router.put('/:id', verificarToken, esAdmin, actualizarLibro);

// Eliminar (Requiere Token y ser Admin)
router.delete('/:id', verificarToken, esAdmin, eliminarLibro);

// SOLO los que tengan token Y sean ADMIN pueden CREAR libros
router.post('/', verificarToken, esAdmin, crearLibros);

router.get('/:id', obtenerLibroPorId);

export default router;