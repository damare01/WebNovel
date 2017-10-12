let mongoose = require('mongoose')

let likeSchema = mongoose.Schema({
  chapter: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  vote: {
    type: Number,
    default: 1
  }
})

module.exports = mongoose.model('Like', likeSchema)
