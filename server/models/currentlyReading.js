var mongoose = require('mongoose');

var currentlyReadingSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true
  },
  chapterTrail: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('CurrentlyReading', currentlyReadingSchema);
