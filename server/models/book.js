var mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  creator: {
    type: String,
    required: true
  }, //author id
  title: {
    type: String,
    required: true
  },
  startChapter: {
    type: String,
    required: true
  }, //chapter id
  coverImage: String, //img url
  language: {
    type: String,
    required: true,
    default: 'en'
  }, //language code
  genre: {
    type: String,
    enum: [
      'Horror',
      'Romance',
      'Science Fiction',
      'Fantasy',
      'Mystery/Suspense',
      'Humour',
      'Paranormal',
      'Adventure',
      'Thriller',
      'Historical Fiction',
      'Teen Fiction',
      'Fan Fiction',
      'Poetry',
      'Short story',
      'Action',
      'Vampire',
      'Werewolf',
      'Spiritual',
      'Non-Fiction',
      'Other'
    ]
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', bookSchema);
