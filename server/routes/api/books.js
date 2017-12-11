let express = require('express')
let router = express.Router()
let Book = require('../../models/book')
let Chapter = require('../../models/chapter')
const requireAuth = require('passport').authenticate('jwt', {session: false})

/**
 * @swagger
 * definitions:
 *  Author:
 *    id:
 *      type: string
 *    penName:
 *      type: string
 */

/**
 * @swagger
 * definitions:
 *    Book:
 *     properties:
 *       author:
 *         type: Author
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
router.get('/', (req, res) => {
  Book.find({'deleted': false}, (err, books) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(books)
    }
  })
})
/**
 * @swagger
 * /books/mybooks:
 *   get:
 *     tags:
 *       - Books
 *     description: Returns all of the books created by the logged in user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of book objects
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.get('/mybooks', requireAuth, (req, res) => {
  let user = req.user
  Book.find({
    $or: [
      {
        'creator': user._id,
        'deleted': false,
      },
      {
        'author.id': user._id,
        'deleted': false
      }]
  }, (err, books) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.send(books)
    }
  })
})

/**
 * @swagger
 * /books/{ids}:
 *   get:
 *     tags:
 *       - Books
 *     description: Returns the books with the provided ids
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "ids"
 *        in: "path"
 *        description: "Book ids seperated by a comma"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: An array of book objects
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.get('/:ids', (req, res) => {
  let idsString = req.params.ids
  let ids = idsString.split(',')
  Book.find({
      '_id': {$in: ids},
      'deleted': false,
    },
    (err, books) => {
      if (err) {
        res.status(500).send({})
      }
      res.send(books)
    })
})


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
  let id = req.params.id
  Book.findOne({'_id': id, 'deleted': false}, (err, book) => {
    if (err) {
      res.status(500).send({})
    } else if (!book) {
      res.status(204).send({})
    } else {
      res.send(book)
    }
  })
})

/**
 * @swagger
 * /books/{id}/chapters:
 *   get:
 *     tags:
 *       - Books
 *     description: Returns all chapters in the book
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
 *         description: An array of chapter objects
 *         schema:
 *           $ref: '#/definitions/Book'
 */
router.get('/:id/chapters', (req, res) => {
  let id = req.params.id
  Chapter.find({'book': id, 'deleted': false, published: true}, (err, chapters) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.send(chapters)
    }
  })
})

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
router.post('/', requireAuth, (req, res) => {
  let book = new Book(req.body)
  book.author = {
    id: req.user._id,
    penName: req.user.penName || req.user.fullName
  }
  console.log(book.description)
  book.save((err) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.status(201).send(book._id)
    }
  })
})

module.exports = router
