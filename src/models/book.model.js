import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  titulo: {type: String, required: [true, 'El titulo es obligatorio'],
  trim: true,  // Borra espacios vacíos al inicio y final "  Libro  " -> "Libro"
  minLength: [3, 'El titulo debe tener al menos 3 caracteres']
},
//  Aquí está el truco: Referenciamos al modelo 'Author'
  autor: {type: mongoose.Schema.Types.ObjectId,
  ref: 'Author',  
  required: [true, ' El autor es obligatorio']
  },
  precio: {
  type: Number,
  min: [0, 'El precio no puede ser negativo'], // 🚩 ¡Validación importante!
  required: [true, 'El precio es obligatorio']
},
  fechaCreacion: {type: Date, default: Date.now}
});

// Creamos el modelo "Book" basado en el esquema
export const Book = mongoose.model('Book', bookSchema);