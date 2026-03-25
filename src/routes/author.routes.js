import { Router } from "express";
import { crearAutor, obtenerAutores } from "../controllers/author.controller.js";

const router = Router();

router.post('/', crearAutor);
router.post('/', obtenerAutores);

export default router;