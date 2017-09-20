var express = require('express');
var router = express.Router();
var Book = require('../../models/book');

router.get('/all', (req, res) => {
  Book.find((err, books) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(books);
    }
  })
});

module.exports = router;
