var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var CurrentlyReading = require('../../models/currentlyReading');

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
 *      currentlyReading:
 *        type: "array"
 *        items:
 *          type: "CurrentlyReading"
 *      resetPasswordToken:
 *        type: "string"
 *      resetPasswordExpires:
 *        type: "Date"
 */


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
router.put('/currentlyreading', (req, res) => {
  let currentlyReading = new CurrentlyReading(req.body);
  User.findOneAndUpdate(
    {
      _id: req.user._id,
      "currentlyReading.book": currentlyReading.book
    },
    {
      "$set": {
        "currentlyReading.$": currentlyReading
      }
    },
    {
      upsert:true
    },
    (err, user) => {
      console.log(user);
      if (err) {

        User.findOne({_id: req.user._id}, (err, user)=>{
          if(err){
            res.sendStatus(500);
          }else{
            user.currentlyReading.push(currentlyReading);
            user.save();
            res.sendStatus(200);
          }
        });
      }else{
        res.sendStatus(200);
      }
    });
});


module.exports = router;
