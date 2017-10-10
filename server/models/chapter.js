var mongoose = require('mongoose');

let chapterSchema = mongoose.Schema({
  author: String, //author id
  title: String,
  body: String,
  parent: String, //chapter id
  childrenIds: [String], //chapter ids
  book: String,
  created: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Chapter', chapterSchema);
