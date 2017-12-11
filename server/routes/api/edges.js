let express = require('express')
let router = express.Router()
const Edge = require('../../models/edge')
const requireAuth = require('passport').authenticate('jwt', {session: false})

/**
 * @swagger
 * definitions:
 *  Edge:
 *    properties:
 *      source:
 *        type: "string"
 *      target:
 *        type: "string"
 *      bookId:
 *        type: "string"
 */

/**
 * @swagger
 * /edges/book/{bookId}:
 *   get:
 *     tags:
 *       - book edge
 *     description:
 *      -
 *        Returns all the edges belonging to the specified book
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "bookId"
 *        in: "path"
 *        description: "Book id"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: An edge object
 *         schema:
 *           $ref: '#/definitions/Edge'
 */
router.get('/books/:bookId', (req, res) => {
  const bookId = req.params['bookId']
  Edge.find({
    bookId: bookId
  }, (err, books) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(books)
    }
  })
})


module.exports = router
