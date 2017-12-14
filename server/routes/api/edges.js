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
  }, (err, edges) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(edges)
    }
  })
})

/**
 * @swagger
 * /edges/book/{bookId}/from/{sourceNodeId}:
 *   get:
 *     tags:
 *       - book edge
 *     description:
 *      -
 *        Returns the edge pointing from the node with the corresponding id
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "bookId"
 *        in: "path"
 *        description: "Book id"
 *        required: true
 *        type: "string"
 *      -
 *        name: "sourceNodeId"
 *        in: "path"
 *        description: "Node id"
 *        required: true
 *        type: string
 *
 *     responses:
 *       200:
 *         description: An edge object
 *         schema:
 *           $ref: '#/definitions/Edge'
 */
router.get('/books/:bookId/from/:sourceNodeId', (req, res) => {
  const bookId = req.params['bookId']
  const sourceId = req.params['sourceNodeId']
  Edge.find({
    bookId: bookId,
    source: sourceId
  }, (err, edges) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(edges)
    }
  })
})


/**
 * @swagger
 * /edges/book/{bookId}/to/{targetNodeId}:
 *   get:
 *     tags:
 *       - book edge
 *     description:
 *      -
 *        Returns the edge pointing from the node with the corresponding id
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "bookId"
 *        in: "path"
 *        description: "Book id"
 *        required: true
 *        type: "string"
 *      -
 *        name: "targetNodeId"
 *        in: "path"
 *        description: "Node id"
 *        required: true
 *        type: string
 *
 *     responses:
 *       200:
 *         description: An edge object
 *         schema:
 *           $ref: '#/definitions/Edge'
 */
router.get('/books/:bookId/to/:targetNodeId', (req, res) => {
  const bookId = req.params['bookId']
  const targetId = req.params['targetNodeId']
  Edge.find({
    bookId: bookId,
    target: targetId
  }, (err, edges) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(edges)
    }
  })
})


/**
 * @swagger
 * /edges:
 *   put:
 *    tags:
 *      - edges
 *    description:
 *      - "Creates a new edge object"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: "201 when successfully created"
 *      500:
 *        description: "500 when there was an error"
 */
router.put('/', requireAuth, (req, res) => {
  let edge = new Edge(req.body)
    edge.save(
    (err, edge) => {
      if (err) {
        console.log(err)
        res.status(500).send({})
      } else {
        res.status(201).send(edge)
      }
    })
})

module.exports = router
