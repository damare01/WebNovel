const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Chapter = require('../../models/chapter')
const Book = require('../../models/book')
const CurrentlyReading = require('../../models/currentlyReading')
const Badge = require('../../models/badge')
const UserBadge = require('../../models/userBadge')
const ReadingHistory = require('../../models/readingHistory')
const requireAuth = require('passport').authenticate('jwt', {session: false})

/**
 * @swagger
 * definitions:
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
 * definitions:
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
 * definitions:
 *  PasswordUser:
 *    properties:
 *      oldPassword:
 *        type: string
 *      newPassword:
 *        type: string
 */

/**
 * @swagger
 * definitions:
 *  Count:
 *    properties:
 *      wordCount:
 *        type: number
 */

/**
 * @swagger
 * definitions:
 *  ReadingHistory:
 *    properties:
 *      bookId:
 *        type: "string"
 *      edgeIds:
 *         type: "array"
 *         items:
 *          type: string
 *      userId:
 *        type: string
 */

/**
 * @swagger
 * /users/{id}/wordcount:
 *   get:
 *    tags:
 *      - wordcount chapters user
 *    description:
 *      - returns the total number of words the user has written
 *    produces:
 *      - application/json
 *    parameters:
 *      -
 *        name: "id"
 *        in: "path"
 *        description: "User Id"
 *        required: true
 *        type: "string"
 *    responses:
 *      200:
 *        description: A wordcount object
 *        schema:
 *          $ref: '#/definitions/Count'
 */
router.get('/:id/wordcount', (req, res) => {
  const userId = req.params['id']
  Chapter
    .aggregate([
      {$match: {author: userId}},
      {
        $group: {
          _id: null,
          total: {
            $sum: '$wordCount'
          }
        }
      }
    ], (err, wordCount) => {
      if (err) {
        res.status(500).send({})
      } else if (wordCount && wordCount.length) {
        res.send({count: wordCount[0].total})
      } else {
        res.status(500).send({})
      }
    })
})

/**
 * @swagger
 * /users/self/currentlyreading/{bookId}:
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
router.get('/self/currentlyreading/:bookId', requireAuth, (req, res) => {
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
 * /users/self/currentlyreading:
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
router.get('/self/currentlyreading', requireAuth, (req, res) => {
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
 * /users/self/readinghistory:
 *   get:
 *     tags:
 *       - readinghistory
 *     description:
 *       - Returns all the readinghistory objects from the logged in user
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: An array of readinghistory objects
 *        schema:
 *          $ref: '#/definitions/ReadingHistory'
 *
 */
router.get('/self/readinghistory', requireAuth, (req, res) => {
  const userId = req.user._id
  ReadingHistory.find({'userId': userId}, (err, history) => {
      if (err) {
        res.status.send({})
      } else {
        res.send(history)
      }
    }
  )
})

/**
 * @swagger
 * /users/self/readinghistory/{bookId}:
 *   get:
 *     tags:
 *       - readinghistory
 *     description:
 *       - Returns the readinghistory object belonging to book with id bookId from the logged in user
 *     produces:
 *       - application/json
 *     parameters:
 *       -
 *        name: "bookId"
 *        in: "path"
 *        description: "Book Id"
 *        required: true
 *        type: "string"
 *     responses:
 *      200:
 *        description: A readinghistory objects
 *        schema:
 *          $ref: '#/definitions/ReadingHistory'
 *
 */
router.get('/self/readinghistory/:bookId', requireAuth, (req, res) => {
  const userId = req.user._id
  const bookId = req.params['bookId']
  ReadingHistory.findOne({'userId': userId, 'bookId': bookId}, (err, history) => {
      if (err) {
        res.status.send({})
      } else if(!history) {
        res.send({})
      } else {
        res.send(history)
      }
    }
  )
})

/**
 * @swagger
 * /users/self/readinghistory:
 *   put:
 *    tags:
 *      - CurrentlyReading
 *    description:
 *      - "Receives a ReadingHistory object and adds
 *         it to the currently reading array of the user logged in. If it already
 *         exists it gets updated"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: "200 when successfully updated"
 *      500:
 *        description: "500 when there was an error"
 */
router.put('/self/readinghistory', requireAuth, (req, res) => {
  let readingHistory = new ReadingHistory(req.body)
  let userId = req.user._id
  readingHistory.userId = userId
  ReadingHistory.findOneAndUpdate(
    {
      'userId': userId,
      'bookId': readingHistory.bookId,
    },
    {
      chapterIds: readingHistory.chapterIds
    },
    {
      upsert: true,
      new: true
    },
    (err, readinghistory) => {
      if (err) {
        console.log(err)
        res.status(500).send({})
      } else {
        res.status(201).send(readinghistory)
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
    ['-currentlyReading', '-password', '-created'],
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
 * /users/{id}/chapters:
 *   get:
 *     tags:
 *       - user chapters count
 *     description:
 *       - Returns the number of chapters a user has written
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
 *        description: The chapter count
 *        schema:
 *          $ref: '#/definitions/Count'
 *
 */
router.get('/:id/chapters/count', (req, res) => {
  let userId = req.params['id']
  Chapter.count(
    {
      deleted: false,
      author: userId,
      published: true
    },
    (err, count) => {
      if (err) {
        res.status(500).send([])
      } else {
        res.send({count: count})
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
 * /users/{id}/books/count:
 *   get:
 *     tags:
 *       - user books
 *     description:
 *       - Returns the number of books a user has created
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
 *        description: The bookcount
 *        schema:
 *          $ref: '#/definitions/Count'
 *
 */
router.get('/:id/books/count', (req, res) => {
  let userId = req.params['id']
  Book.count({
      $or: [{
        'creator': userId,
        'deleted': false,
      },
        {
          'author.id': userId,
          'deleted': false
        }]
    },
    (err, count) => {
      if (err) {
        res.status(500).send([])
      } else {
        res.send({count: count})
      }
    }
  )
})

/**
 * @swagger
 * /users/{id}/badges:
 *   get:
 *     tags:
 *       - user badges
 *     description:
 *       - Returns the badges gotten by the user
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
 *        description: An array of badge objects
 *        schema:
 *          $ref: '#/definitions/Badge'
 *
 */
router.get('/:id/badges', (req, res) => {
  let userId = req.params['id']
  UserBadge.find({
      user_id: userId
    },
    (err, userBadges) => {
      if (!err) {
        let badgeIds = userBadges.map(ub => ub.badge_id)
        Badge.find({
          _id: {$in: badgeIds}
        }, (err, badges) => {
          if (err) {
            res.status(500).send({})
          } else {
            res.send(badges)
          }
        })
      }
    }
  )
})

/**
 * @swagger
 * /users/self/currentlyreading:
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
router.put('/self/currentlyreading', requireAuth, (req, res) => {
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
    User.findOneAndUpdate(
      {_id: loggedInUser._id},
      {
        bio: updatedUser.bio,
        fullName: updatedUser.fullName,
        penName: updatedUser.penName
      }, (err, oldUser) => {
        if (err) {
          res.status(500).send({})
        } else {
          let penName = updatedUser.penName || updatedUser.fullName
          Book.update({'author.id': loggedInUser._id}, {'author.penName': penName}, {multi: true}, (err, books) => {
              res.send(oldUser)
            }
          )
        }
      }
    )
  }
})

/**
 * @swagger
 * /users/changepass:
 *   put:
 *    tags:
 *      - users
 *    description: Creates a new password for the logged in user
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: "The updated user"
 *        schema:
 *          $ref: '#/definitions/PasswordUser'
 *      500:
 *        description: "500 when there was an error"
 */
router.put('/changepass', requireAuth, (req, res) => {
  //if oldPassword field is correct then update
  let oldPassword = req.body.oldPassword
  let newPassword = req.body.newPassword
  console.log(oldPassword)
  User.findOne({_id: req.user._id}, (err, user) => {
    if (err) {
      console.log('fusste error')
      res.status(500).send({})
    } else {
      user.comparePassword(oldPassword, function (err, isMatch) {
        if (err) {
          console.log('andre error')
          console.log(err)
          res.status(403).send({})
        }
        else if (!isMatch) {
          return res.status(403).send({})
        } else {
          if (newPassword.length < 3) {
            console.log('ikke langt nok')
            res.status(500).send({})
          } else {
            user.password = newPassword
            user.save((err, user) => {
              if (err) {
                console.log('saving error')
                res.status(500).send({})
              } else {
                res.send(user)
              }
            })
          }

        }
      })
    }
  })

})


module.exports = router
