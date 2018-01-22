let mongoose = require('mongoose')

let chapterSchema = mongoose.Schema({
  author: String, // author id
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  parent: String, // chapter id
  book: String,
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
  views:{
    type: Number,
    default: 0
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  wordCount:{
    type: Number
  }
})

chapterSchema.pre('save', function(next){
  const htmlStrippedBody = this.body.replace(/<(?:.|\n)*?>/gm, '')
  this.wordCount = htmlStrippedBody.split(' ').length || 0
  next()
})

module.exports = mongoose.model('Chapter', chapterSchema)
