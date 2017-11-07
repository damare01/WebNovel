let express = require('express')
let router = express.Router()
let User = require('../../models/user')
let Chapter = require('../../models/chapter')
let Book = require('../../models/book')
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
        if (user) {
          res.send(user.currentlyReading)
        } else {
          res.send([])
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
 * /users/{id}/chapters:
 *   get:
 *     tags:
 *       - user chapters
 *     description:
 *       - Returns the chapters written by the user with the given id
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
 *        description: An array of chapter objects
 *        schema:
 *          $ref: '#/definitions/Chapter'
 *
 */
router.get('/:id/chapters', (req, res) => {
  let userId = req.params['id']
  Chapter.find(
    {
      deleted: false,
      author: userId,
      published: true
    },
    (err, chapters) => {
      if (err) {
        res.status(500).send([])
      } else {
        res.send(chapters)
      }
    }
  )
})

/**
 * @swagger
 * /users/{id}/books:
 *   get:
 *     tags:
 *       - user books
 *     description:
 *       - Returns the books written by the user with the given id
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
 *        description: An array of book objects
 *        schema:
 *          $ref: '#/definitions/Book'
 *
 */
router.get('/:id/books', (req, res) => {
  let userId = req.params['id']
  Book.find({
      $or: [{
        'creator': userId,
        'deleted': false,
      },
        {
          'author.id': userId,
          'deleted': false
        }]
    },
    (err, books) => {
      if (err) {
        res.status(500).send([])
      } else {
        res.send(books)
      }
    }
  )
})

/**
 * @swagger
 * /users/currentlyreading:
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
            res.status(500).send({})
          } else {
            user.currentlyReading.push(currentlyReading)
            user.save()
            res.status(200).send({})
          }
        })
      } else {
        res.status(200).send({})
      }
    })
})

/**
 * @swagger
 * /users:
 *   put:
 *    tags:
 *      - users
 *    description: "Modifies the logged in user"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: "The old user object"
 *        schema:
 *          $ref: '#/definitions/User'
 *      500:
 *        description: "500 when there was an error"
 */
router.put('/', requireAuth, (req, res) => {
  let loggedInUser = req.user
  let updatedUser = new User(req.body)
  if (loggedInUser._id != updatedUser._id) {
    res.status(403).send({})
  } else {
    User.findOneAndUpdate({_id: loggedInUser._id}, updatedUser, (err, oldUser) => {
        if (err) {
          res.status(500).send({})
        } else {
          res.send(oldUser)
        }
      }
    )
  }
})


module.exports = router
