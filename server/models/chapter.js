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
  tags: {
    type: [String],
    default: []
  },
  published: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Chapter', chapterSchema);
