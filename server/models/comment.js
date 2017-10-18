let mongoose = require('mongoose')
let authorSchema = require('./author').schema

let commentSchema = mongoose.Schema({
  author: authorSchema,
  posted: {
    type: Date,
    default: Date.now
  },
  discussion_id: {
    type: String,
    required: true
  },
  parent_id: {
    type: String,
    default: ''
  },
  text: String,
  deleted: {
    type: Boolean,
    default: false
  }
})
