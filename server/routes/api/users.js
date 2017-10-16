let express = require('express')
let router = express.Router()
let User = require('../../models/user')
let CurrentlyReading = require('../../models/currentlyReading')
const requireAuth = require('passport').authenticate('jwt', {session: false})

/**
 * @swagger
 * definition:
 *  CurrentlyReading:
 *    properties:
 *      book:
 *        type: "string"
 *      chapterTrail:
 *        type: "array"
 *        items:
 *          type: "string"
 */

/**
 * @swagger
 * definition:
 *  User:
 *    properties:
 *      fullName:
 *        type: "string"
 *      email:
 *        type: "string"
 *      password:
 *        type: "string"
 *      created:
 *        type: "Date"
 *      role:
 *        type: "string"
 *      resetPasswordToken:
 *        type: "string"
 *      resetPasswordExpires:
 *        type: "Date"
 */

/**
 * @swagger
 * /users/currentlyreading/{bookId}:
 *   get:
 *     tags:
 *       - currentlyreading user
 *     description:
 *       - Returns the currently-reading object from the logged in user
 *         with the specified bookid
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "bookId"
 *        in: "path"
 *        description: "Book Id"
 *        required: true
 *        type: "string"
 *     responses:
 *      200:
 *        description: A currently-reading object
 *        schema:
 *          $ref: '#/definitions/CurrentlyReading'
 *
 */
router.get('/currentlyreading/:bookId', requireAuth, (req, res) => {
  User.findOne(
    {
      '_id': req.user._id, 'currentlyReading.book': req.params.bookId,
    },
    {
      currentlyReading: {$elemMatch: {book: req.params.bookId}},
    },
    (err, user) => {
      if (err) {
        res.sendStatus(500)
      } else {
        if (user && user.currentlyReading.length) {
          res.send(user.currentlyReading[0])
        } else {
          res.sendStatus(204)
        }
      }
    })
})

/**
 * @swagger
 * /users/currentlyreading:
 *   get:
 *     tags:
 *       - currentlyreading
 *     description:
 *       - Returns all the currently-reading objects from the logged in user
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: An array of currently-reading objects
 *        schema:
 *          $ref: '#/definitions/CurrentlyReading'
 *
 */
router.get('/currentlyreading', requireAuth, (req, res) => {
  User.findOne(
    {
      _id: req.user._id,
    },
    (err, user) => {
      if (err) {
        res.status(500).send({})
      } else {
        if (user && user.currentlyReading) {
          res.send(user.currentlyReading)
        } else {
          res.sendStatus(204)
        }
      }
    })
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - user
 *     description:
 *       - Returns the user with the specified ID
 *     produces:
 *       - application/json
 *     parameters:
 *       -
 *        name: "id"
 *        in: "path"
 *        description: "User Id"
 *        required: true
 *        type: "string"
 *     responses:
 *      200:
 *        description: A user object
 *        schema:
 *          $ref: '#/definitions/User'
 *
 */
router.get('/:id', (req, res) => {
  User.findOne(
    {
      _id: req.params['id'],
    },
    '-currentlyReading',
    (err, user) => {
      if (err) {
        res.status(500).send({})
      } else {
        res.send(user)
      }
    })
})

/**
 * @swagger
 * /currentlyreading:
 *   put:
 *    tags:
 *      - CurrentlyReading
 *    description:
 *      - "Receives a currently reading object and adds
 *         it to the currently reading array of the user logged in. If it already
 *         exists it gets updated"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: "20 when successfully updated"
 *      500:
 *        description: "500 when there was an error"
 */
router.put('/currentlyreading', requireAuth, (req, res) => {
  let currentlyReading = new CurrentlyReading(req.body)
  User.findOneAndUpdate(
    {
      '_id': req.user._id,
      'currentlyReading.book': currentlyReading.book,
    },
    {
      '$set': {
        'currentlyReading.$': currentlyReading,
      },
    },
    {
      upsert: true,
    },
    (err, user) => {
      if (err) {
        User.findOne({_id: req.user._id}, (err, user) => {
          if (err) {
            res.sendStatus(500)
          } else {
            user.currentlyReading.push(currentlyReading)
            user.save()
            res.sendStatus(200)
          }
        })
      } else {
        res.sendStatus(200)
      }
    })
})


module.exports = router
