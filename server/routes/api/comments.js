let express = require('express')
let router = express.Router()
let Comment = require('../../models/comment')
const requireAuth = require('passport').authenticate('jwt', {session: false})
const CurrencyCtrl = require('./controllers/currencyCtrl')

/**
 * @swagger
 * definition:
 *  Comment:
 *    author:
 *      type: Author
 *    posted:
 *      type: date
 *    discussion_id:
 *      type: string
 *    parent_id:
 *      type: string
 *    text:
 *      type: string
 *
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     tags:
 *       - comment
 *     description: Returns the book with the provided id
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "commentId"
 *        in: "path"
 *        description: "Comment id"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: A comment object
 *         schema:
 *           $ref: '#/definitions/Comment'
 */
router.get('/:commentId', (req, res) => {
  let id = req.params['commentId']
  Comment.findOne({
    _id: id,
    deleted: false
  }, (err, comment) => {
    if (err) {
      res.status(500).send({})
    } else if (!comment) {
      res.status(204).send({})
    } else {
      res.send(comment)
    }
  })
})

/**
 * @swagger
 * /comments/{commentId}/children:
 *   get:
 *     tags:
 *       - comment children
 *     description:
 *      - Returns all comments having the comment with commentId as parent
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "commentId"
 *        in: "path"
 *        description: "The id of the parent comment"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: An array of comment objects
 *         schema:
 *           $ref: '#/definitions/Comment'
 */
router.get('/:commentId/children', (req, res) => {
  let id = req.params['commentId']
  Comment.find({
    deleted: false,
    parent_id: id
  }, (err, comments) => {
    if (err) {
      res.status(500).send([])
    } else {
      res.send(comments)
    }
  })
})


/**
 * @swagger
 * /comments/discussions/{discussionId}:
 *   get:
 *     tags:
 *       - comment discussion
 *     description: Returns the comments belonging to the discussion with the provided id
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "discussionId"
 *        in: "path"
 *        description: "The id of the desired discussion"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: An array of comment objects
 *         schema:
 *           $ref: '#/definitions/Comment'
 */
router.get('/discussions/:discussionId', (req, res) => {
  Comment.find({
    deleted: false,
    discussion_id: req.params['discussionId']
  }, (err, comments) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.send(comments)
    }
  })
})


/**
 * @swagger
 * /comments/discussions/{discussionId}/rootcomments:
 *   get:
 *     tags:
 *       - comment discussion root
 *     description:
 *      - Returns all rootcomments (comments with no parents)
 *        belonging to the provided discussionId
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "discussionId"
 *        in: "path"
 *        description: "The id of the desired discussion"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: An array of comment objects
 *         schema:
 *           $ref: '#/definitions/Comment'
 */
router.get('/discussions/:discussionId/rootcomments', (req, res) => {
  Comment.find({
      deleted: false,
      discussion_id: req.params['discussionId'],
      parent_id: ''
    }, (err, comments) => {
      if (err) {
        res.status(500).send([])
      } else {
        res.send(comments)
      }
    }
  )
})

/**
 * @swagger
 * /comments:
 *  post:
 *    tags:
 *      - comment
 *    description: "Adds a new comment to the db"
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: "201 when successfully created"
 *      500:
 *       description: "500 when there was an error"
 */
router.post('/', requireAuth, (req, res) => {
  let comment = new Comment(req.body)
  comment.author = {
    id: req.user._id,
    penName: req.user.penName || req.user.fullName
  }
  comment.save((err) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.status(201).send(comment._id)
      CurrencyCtrl.incrementCommentsCurrency(comment.discussion_id, (err) => {
      })
    }
  })
})

module.exports = router
