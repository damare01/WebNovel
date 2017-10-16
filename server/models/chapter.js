let mongoose = require('mongoose')

let chapterSchema = mongoose.Schema({
  author: ObjectId, // author id
  title: String,
  body: String,
  parent: ObjectId, // chapter id
  childrenIds: [ObjectId], // chapter ids
  book: ObjectId,
  created: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  published: {
    type: Boolean,
    default: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Chapter', chapterSchema)
