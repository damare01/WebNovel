var mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  creator: String, //author id
  title: String,
  startChapter: String, //chapter id
  coverImage: String, //img url
  chapters: [String], //chapter ids. TODO: Is this needed, or should you just iterate the tree
  language: String //language code
});

module.exports = mongoose.model('Book', bookSchema);
