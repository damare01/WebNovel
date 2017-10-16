let mongoose = require('mongoose')

let likeSchema = mongoose.Schema({
  chapter: {
    type: ObjectId,
    require: true,
  },
  user: {
    type: ObjectId,
    require: true,
  },
  vote: {
    type: Number,
    default: 1,
  },
})

module.exports = mongoose.model('Like', likeSchema)
