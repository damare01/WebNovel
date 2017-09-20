var mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
    creator: String, //author id
    title: String,
    startChapter: String, //chapter id
    coverImage: String, //img url
    chapters: [String] //chapter ids
});

module.exports = mongoose.model('Book', bookSchema);
