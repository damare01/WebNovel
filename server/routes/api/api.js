var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var chapters = require('./chapters');
var books = require('./books');

var BOOK_COLLECTION = 'books';
var CHAPTER_COLLECTION = 'chapters';
var USER_COLLECTIONS = 'users';

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true, promiseLibrary: global.Promise});
var db = mongoose.connection;

db.once('open', ()=>{
    console.log('Connected to db');
    router.use('/chapters', chapters);
    router.use('/books', books);
});


router.get('/', (req, res)=>{
   res.send('Error: No parameters')
});

module.exports = router;
