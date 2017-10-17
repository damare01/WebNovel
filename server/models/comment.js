let mongoose = require('mongoose')
let User = require('user')
let authorSchema = require('authorSchema')

let commentSchema = mongoose.Schema({
  author: authorSchema,
  posted: {
    type: Date,
    default: Date.now
  },
  discussion_id: {
    type: String
  },
  parent_id: String,
  text: String
})
