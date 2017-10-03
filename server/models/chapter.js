var mongoose = require('mongoose');

let chapterSchema = mongoose.Schema({
    author: String, //author id
    title: String,
    body: String,
    parent: String, //chapter id
    childrenIds: [String], //chapter ids
    book: String
})

module.exports = mongoose.model('Chapter', chapterSchema);
