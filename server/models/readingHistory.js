let mongoose = require('mongoose')

let readingHistorySchema= new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  chapterIds: {
    type: [String],
    required: true,
  },
  userId:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ReadingHistory', readingHistorySchema)
