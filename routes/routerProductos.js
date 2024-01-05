const express = require("express");
const book = require("../models/modelProductos");
const Joi = require("joi");
const { requiredScopes } = require("express-oauth2-jwt-bearer");

const bookSchema = Joi.object({
  title: Joi.string().required().label("Título"),
  author: Joi.string().required().label("Autor"),
});

const router = express.Router();

router.get("/", requiredScopes("read:productos"), async (req, res, next) => {
  try {
    const books = await book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requiredScopes("read:productos"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const books = await book.findById(id);
    res.json(books);
  } catch (err) {
    res.status(404).send("Libro no encontrado");
  }
});

router.post("/", requiredScopes("write:productos"), async (req, res, next) => {
  try {
    const { value, error } = bookSchema.validate(req.body);
    if (error) {
      const err = new Error("Error de validación");
      err.statusCode = 400;
      throw err;
    }
    const newBook = new book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  requiredScopes("write:productos"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const books = await book.findByIdAndUpdate(id, req.body, { new: true });
      res.json(books);
    } catch (err) {
      res.status(500).send("Error al actualizar el libro");
    }
  }
);

router.delete(
  "/:id",
  requiredScopes("write:productos"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const books = await book.findByIdAndDelete(id);
      res.json(books);
    } catch (err) {
      res.status(500).send("Error al eliminar el libro");
    }
  }
);

module.exports = router;
