var express = require('express');
var router = express.Router();
var Chapter = require('../../models/chapter');

router.get('/all', (req, res) => {
  Chapter.find((err, chapters) => {
    res.send(chapters);
  })
});

module.exports = router;

