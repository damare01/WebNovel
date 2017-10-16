let mongoose = require('mongoose')

let currentlyReadingSchema = new mongoose.Schema({
  book: {
    type: ObjectId,
    required: true,
  },
  chapterTrail: {
    type: [ObjectId],
    required: true,
  },
})

module.exports = mongoose.model('CurrentlyReading', currentlyReadingSchema)
