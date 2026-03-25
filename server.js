import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Importar tus archivos
import bookRoutes from "./src/routes/book.routes.js";
import authorRoutes from "./src/routes/author.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { logger } from "./src/middlewares/logger.middleware.js";
import { globalErrorHandler } from "./src/middlewares/error.middleware.js";

dotenv.config();

// 1. CREAR LA APP PRIMERO QUE NADA
const app = express();
const PORT = 3000;

// 2. CONFIGURAR SWAGGER
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de mi Librería 📚",
      version: "1.0.0",
      description: "CRUD completo de Libros y Autores con Seguridad JWT",
    },
    servers: [{ url: "http://localhost:3000" }],
    //  AQUÍ ESTÁ TODO TU MAPA DE RUTAS
    paths: {
      "/auth/login": {
        post: {
          summary: "Iniciar sesión (Obtener Token)",
          responses: { 200: { description: "Login exitoso" } },
        },
      },
      "/libros": {
        get: {
          summary: "Listar todos los libros",
          responses: { 200: { description: "Lista obtenida" } },
        },
        post: {
          summary: "Crear un nuevo libro (Solo Admin)",
          responses: { 201: { description: "Libro creado" } },
        },
      },
      "/libros/{id}": {
        //  Rutas que necesitan un ID
        get: {
          summary: "Obtener un libro por ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Libro encontrado" } },
        },
        put: {
          summary: "Actualizar un libro (Solo Admin)",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Libro actualizado" } },
        },
        delete: {
          summary: "Eliminar un libro (Solo Admin)",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { 200: { description: "Libro eliminado" } },
        },
      },
    },
  },
  apis: [], // Seguimos dejándolo vacío para evitar errores de escaneo
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 3. MIDDLEWARES BÁSICOS
app.use(express.json());
app.use(logger);

// 4. RUTA DE SWAGGER (Solo una vez y con swaggerDocs)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 5. RUTAS DE LA API
app.use("/libros", bookRoutes);
app.use("/autores", authorRoutes);
app.use("/auth", authRoutes);

// 6. MANEJO DE ERRORES (Siempre al final de las rutas)
app.use(globalErrorHandler);

// 7. CONEXIÓN Y ENCENDIDO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔌 Conectado a MongoDB con éxito");
    app.listen(PORT, () => {
      console.log(` Servidor en http://localhost:${PORT}`);
      console.log(` Documentación en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.error(" Error al conectar a MongoDB:", err));
