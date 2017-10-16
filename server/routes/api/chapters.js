const express = require('express')
const router = express.Router()
const Chapter = require('../../models/chapter')
const requireAuth = require('passport').authenticate('jwt', {session: false})

/**
 * @swagger
 * definition:
 *   Chapter:
 *     properties:
 *       author:
 *         type: string
 *       title:
 *         type: string
 *       body:
 *         type: string
 *       parent:
 *         type: string
 *       children:
 *         type: "array"
 *         items:
 *          type: "string"
 *       tags:
 *         type: "array"
 *         items:
 *          type: "string"
 */

/**
 * @swagger
 * /chapters:
 *   get:
 *     tags:
 *       - Chapters
 *     description: Returns all chapters
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: An array of chapters
 *        schema:
 *          $ref: '#/definitions/Chapter'
 */
router.get('/', (req, res) => {
  Chapter.find((err, chapters) => {
    res.send(chapters)
  })
})

/**
 * @swagger
 * /chapters/myChapters:
 *   get:
 *     tags:
 *       - Chapters mychapters
 *     description: Returns all published chapters belonging to the logged in user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: An array of chapters
 *        schema:
 *          $ref: '#/definitions/Chapter'
 */
router.get('/myChapters', requireAuth, (req, res) => {
  Chapter.find({author: req.user._id, deleted: false, published: true}, (err, chapters) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.send(chapters)
    }
  })
})

/**
 * @swagger
 * /chapters/drafts:
 *   get:
 *     tags:
 *       - Chapters drafts
 *     description: Returns all drafts belonging to the logged in user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: An array of chapters
 *        schema:
 *          $ref: '#/definitions/Chapter'
 */
router.get('/drafts', requireAuth, (req, res) => {
  Chapter.find(
    {
      author: req.user._id,
      published: false,
    }, (err, chapters) => {
      if (err) {
        res.status(500).send({})
      } else {
        res.send(chapters)
      }
    })
})

/**
 * @swagger
 * /chapters/drafts/{id}:
 *   get:
 *    tags:
 *      - chapters drafts
 *    description: "Gets the chapter draft with the provided id if it belongs to the logged in user"
 *    produces:
 *      - application/json
 *    parameters:
 *      -
 *        name: "id"
 *        in: "path"
 *        description: "chapter id"
 *        required: true
 *        type: "string"
 *    responses:
 *      200:
 *        description: "Returns a chapter saved as a draft with the provided id"
 *        schema:
 *          $ref: '#/definitions/Chapter'
 *      500:
 *        description: "500 when there was an error"
 */
router.get('/drafts/:id', requireAuth, (req, res) => {
  Chapter.findOne(
    {
      _id: req.params['id'],
      author: req.user._id,
      published: false,
    }, (err, chapter) => {
      if (err) {
        res.status(500).send({})
      } else {
        res.send(chapter)
      }
    })
})

/**
 * @swagger
 * /chapters:
 *   post:
 *    tags:
 *      - Chapters
 *    description: "Adds a new chapter to the db"
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: "201 when successfully created"
 *      500:
 *        description: "500 when there was an error"
 */
router.post('/', requireAuth, (req, res) => {
  let chapter = new Chapter(req.body)
  chapter.author = req.user._id
  chapter.save((err) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.status(201).send(chapter._id)
    }
  })
})

/**
 * @swagger
 * /chapters:
 *   put:
 *    tags:
 *      - Chapters
 *    description: "Modifies an existing chapter if the logged in user is the original author"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: "The old chapter object"
 *        schema:
 *          $ref: '#/definitions/Chapter'
 *      500:
 *        description: "500 when there was an error"
 */
router.put('/', requireAuth, (req, res) => {
  let chapter = new Chapter(req.body)
  let id = chapter._id
  Chapter.findOneAndUpdate({_id: id, author: req.user._id}, chapter, (err, doc) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.status(200).send(doc)
    }
  })
})

/**
 * @swagger
 * /chapters/{parentId}/child/{childId}:
 *   post:
 *    tags:
 *      - Chapters
 *    description: "Adds a child chapter to an existing chapter"
 *    produces:
 *      - application/json
 *    parameters:
 *      -
 *        name: "parentId"
 *        in: "path"
 *        description: "parent chapter id"
 *        required: true
 *        type: "string"
 *      -
 *        name: "childId"
 *        in: "path"
 *        description: "child chapter id"
 *        required: true
 *        type: "string"
 *    responses:
 *      200:
 *        description: "The old chapter object"
 *        schema:
 *          $ref: '#/definitions/Chapter'
 *      500:
 *        description: "500 when there was an error"
 */
router.post('/:parentId/child/:childId', requireAuth, (req, res) => {
  Chapter.findOne({_id: req.params['parentId']}, (err, chapter) => {
    if (err) {
      res.status(500).send({})
    } else {
      chapter.childrenIds.push(req.params['childId'])
      chapter.save((err, done) => {
        if (err) {
          res.status(500).send({})
        } else {
          res.status(200).send(chapter)
        }
      })
    }
  })
})

/**
 * @swagger
 * /chapters/id/{id}:
 *   get:
 *     tags:
 *       - Chapters
 *     description: Returns the chapter with the provided id
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "id"
 *        in: "path"
 *        description: "Chapter id"
 *        required: true
 *        type: "string"
 *     responses:
 *      200:
 *        description: A chapter object
 *        schema:
 *          $ref: '#/definitions/Chapter'
 *
 */
router.get('/id/:id', (req, res) => {
  let id = req.params.id
  Chapter.findOne({_id: id, published: true}, (err, chapter) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.send(chapter)
    }
  })
})


module.exports = router

