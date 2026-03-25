import { Book } from '../models/book.model.js';

//1. OBTENER TODOS LOS LIBROS 
export const obtenerLibros = async (req, res, next) => {
  try {
    // Book.find() busca TODOS los documentos en la colección
    // .populate('autor') busca el ID y lo reemplaza por el objeto real del autor
    const libros = await Book.find().populate('autor');
    res.json(libros);
  } catch (error) {
    next(error); // Nuestro paracaidas global lo atrapa
  }
};

// 2. CREAR UN LIBRO NUEVO
export const crearLibros =  async (req, res, next) => {
  try {
    // Book.create(datos) lo guarda directamente en MongoDB
    const nuevoLibro = await Book.create(req.body);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    // Si falta el título (required: true), Mongoose lanzará un error 
        // y este catch lo enviará al errorMiddleware
        next(error);
  }
}

export const obtenerLibroPorId = async(req, res, next) => {
  try {
    // Usamos findById con el id que viene en la URL
    const libro = await Book.findById(req.params.id);
    if (!libro) {
            const error = new Error("Libro no encontrado");
            error.statusCode = 404;
            throw error;
        }
        res.json(libro);
  } catch (error) {
    next(error);
  }
};

export const actualizarLibro = async (req, res, next) => {
    try {
       const { id } = req.params;
       const datosActulizados = req.body;

       //{ new } hace que mongoose devuelva el libro Ya editado
       const libroEditado = await Book.findByIdAndUpdate(id, datosActulizados, { new: true });

       if( !libroEditado ){
        const error = new Error("Libro no encontrado");
        error.statusCode = 404;
        throw error;
       }
       res.json({mensaje: "Libro actulizado", libro: libroEditado})
    } catch (error) {
        next(error);
    }
};

export const eliminarLibro = async (req, res, next) => {
    try {
        const { id } = req.params;
        const libroEliminado = await Book.findByIdAndDelete(id);
        
        if (!libroEliminado) {
            const error = new Error("Libro no encontrado");
            error.statusCode = 404;
            throw error;
        }
        res.json({ mensaje: "Libro eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};