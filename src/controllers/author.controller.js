import e from "express";
import { Author } from "../models/author.model.js";

export const crearAutor = async (req, res, next) => {
  try {
    const nuevoAutor = await Author.create(req.body);
    res.status(201).json(nuevoAutor);
  } catch (error) {
    next(error);
  }
};

export const obtenerAutores = async (req, res, next) => {
  try {
    const autores = await Author.find();
    res.json(autores);
  } catch (error) {
    next(error);
  }
};