var mongoose = require('mongoose');

let chapterSchema = mongoose.Schema({
    author: String, //author id
    title: String,
    body: String,
    parent: String, //chapter id
    children: [String] //chapter ids
})

module.exports = mongoose.model('Chapter', chapterSchema);
