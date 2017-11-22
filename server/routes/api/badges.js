let express = require('express')
let router = express.Router()
const Badge = require('../../models/badge')
const requireAuth = require('passport').authenticate('jwt', {session: false})
const MessageHandler = require('../../controllers/message-handler')

/**
 * @swagger
 * definitions:
 *  Badge:
 *    properties:
 *      name:
 *        type: "string"
 *      description:
 *        type: "string"
 *      currency_thresholds:
 *        type: array
 *        items:
 *          type: CurrencyThreshold
 */

/**
 * @swagger
 * definitions:
 *  CurrencyThreshold:
 *    properties:
 *      currency_id:
 *        type: "string"
 *      threshold:
 *        type: "number"
 */


/**
 * @swagger
 * /badges/{id}:
 *   get:
 *     tags:
 *       - notifications
 *     description:
 *      -
 *        Returns the badge with the specified ID
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
  const badgeId = req.params['id']
  Badge.findOne({
   _id: badgeId
  }, (err, badge) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(badge)
    }
  })
})


module.exports = router
