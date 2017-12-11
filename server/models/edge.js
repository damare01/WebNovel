let mongoose = require('mongoose')

let edgeSchema = mongoose.Schema({
  source: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: true
  }
})

edgeSchema.index({source: 1, target: 1, bookId: 1}, { unique: true })

module.exports = mongoose.model('Edge', edgeSchema, 'edges')
