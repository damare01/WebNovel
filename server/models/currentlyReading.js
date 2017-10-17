let mongoose = require('mongoose')

let currentlyReadingSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true,
  },
  chapterTrail: {
    type: [String],
    required: true,
  },
})

module.exports = mongoose.model('CurrentlyReading', currentlyReadingSchema)
