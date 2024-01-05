const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/library");

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
});

const book = mongoose.model("books", bookSchema);

module.exports = book;
