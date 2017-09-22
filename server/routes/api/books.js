var express = require('express');
var router = express.Router();
var Book = require('../../models/book');

/**
 * @swagger
 * definition:
 *    Book:
 *     properties:
 *       creator:
 *         type: "string"
 *       title:
 *         type: "string"
 *       startChapter:
 *         type: "string"
 *       coverImage:
 *         type: "string"
 *       chapters:
 *         type: "array"
 *         items:
 *          type: "string"
 *       language:
 *        type: "string"
 */

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     description: Returns all books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of books
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.get('/all', (req, res) => {
  Book.find((err, books) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(books);
    }
  })
});

/**
 * @swagger
 * /books/id/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Returns the book with the provided id
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "id"
 *        in: "path"
 *        description: "Book id"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: A book object
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.get('/id/:id', (req, res) => {
  let id = req.params.id;
  Book.findOne({_id: id}, (err, chapter) => {
    if (err) {
      res.sendStatus(500);
    } else if (!chapter) {
      res.sendStatus(204);
    } else {
      res.send(chapter);
    }
  })
});

/**
 * @swagger
 * /books:
 *  post:
 *    tags:
 *      - Books
 *    description: "Adds a new chapter to the db"
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: "201 when successfully created"
 *      500:
 *       description: "500 when there was an error"
 */
router.post('/', (req, res) => {
  let book = req.body;
  Book.save(book, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })
});

module.exports = router;
