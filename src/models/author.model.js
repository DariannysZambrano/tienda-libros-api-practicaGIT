import mongoose from "mongoose";

const authorShema = new mongoose.Schema({
  nombre: {type: String, required: true},
  nacionalidad: String,
  biografia: String
});

export const Author = mongoose.model('Author', authorShema);