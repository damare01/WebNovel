let express = require('express')
let router = express.Router()
let Notification = require('../../models/notification')
const requireAuth = require('passport').authenticate('jwt', {session: false})
const MessageHandler = require('../../controllers/message-handler')

/**
 * @swagger
 * definitions:
 *  Notification:
 *    properties:
 *      created:
 *        type: "date"
 *      actorId:
 *         type: "string"
 *      subjectId:
 *        type: string
 *      objectId:
 *        type: string
 *      verb:
 *        type: string
 *      objectType:
 *        type: string
 *      read:
 *        type: boolean
 */


/**
 * @swagger
 * /notifications/new:
 *   get:
 *     tags:
 *       - notifications
 *     description:
 *      -
 *        Returns the logged in user's unread notifications
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of notification objects
 *         schema:
 *           $ref: '#/definitions/Notification'
 */
router.get('/new', requireAuth, (req, res) => {
  let userId = req.user._id
  Notification.find(
    {
      subjectId: userId,
      read: false
    }, (err, notifications) => {
      if (err) {
        res.status(500).send({})
      } else {
        res.send(notifications)
      }
    })
})

/**
 * @swagger
 * /notifications:
 *  post:
 *    tags:
 *      - notifications
 *    description: "Adds a new notification to the db"
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: "The assigned notification id"
 *      500:
 *       description: "500 when there was an error"
 */
router.post('/', requireAuth, (req, res) => {
  let newNotification = new Notification(req.body)
  newNotification.actorId = req.user._id
  newNotification.save(err => {
    if (err) {
      console.log(err)
      res.status(500).send({})
    } else {

      MessageHandler.emitMessage(newNotification.subjectId, 'notification', newNotification)
      res.status(201).send(newNotification._id)
    }
  })
})

/**
 * @swagger
 * /notifications:
 *   put:
 *    tags:
 *      - notifications
 *    description: "Modifies an existing notification if the logged in user is the receiver of the notification (subject)"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: "The old notification object"
 *        schema:
 *          $ref: '#/definitions/Notification'
 *      500:
 *        description: "500 when there was an error"
 */
router.put('/', requireAuth, (req, res) => {
  let notification = new Notification(req.body)
  let id = notification._id
  Notification.findOneAndUpdate({_id: id, subjectId: req.user._id}, notification, (err, doc) => {
    if (err) {
      res.status(500).send({})
    } else {
      res.status(200).send(doc)
    }
  })
})

/**
 * @swagger
 * /notifications/range/{from}/{to}:
 *   get:
 *     tags:
 *       - notifications
 *     description:
 *      -
 *       Returns the notifications belonging to the authorized user
 *       in the given range. (/range/0/10 being the latest 10)
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "from"
 *        in: "path"
 *        description: "From index"
 *        required: true
 *        type: "string"
 *      -
 *        name: "to"
 *        in: "path"
 *        description: "To index"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: An array of notification objects
 *         schema:
 *           $ref: '#/definitions/Notification'
 */
router.get('/range/:from/:to', requireAuth, (req, res) => {
  let from = Number(req.params['from'])
  let to = Number(req.params['to'])
  let userId = req.user['_id']
  let query = Notification.find({subjectId: userId}).skip(from).limit(to-from).sort({'created': -1})

    query.exec((err, notifications) => {
      if(err){
        console.log(err)
        res.status(500).send({})
      } else {
        res.send(notifications)
      }
    })
})

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     tags:
 *       - notifications
 *     description:
 *      -
 *        Returns the notification with the specified id if the
 *        authorized user is either subject or actor
 *     produces:
 *       - application/json
 *     parameters:
 *      -
 *        name: "id"
 *        in: "path"
 *        description: "Notification id"
 *        required: true
 *        type: "string"
 *     responses:
 *       200:
 *         description: A notification object
 *         schema:
 *           $ref: '#/definitions/Notification'
 */
router.get('/:id', requireAuth, (req, res) => {
  Notification.findOne({
    $or:
      [
        {
          _id: req.params['id'],
          actorId: req.user._id
        },
        {
          _id: req.params['id'],
          subjectId: req.user._id
        }
      ]
  }, (err, likes) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(likes)
    }
  })
})


module.exports = router
