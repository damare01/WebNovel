let mongoose = require('mongoose')
let notificationSchema = new mongoose.Schema({
  created:{
    type: Date,
    default: Date.now
  },
  actorId:{
    type: String,
    required: true
  },
  subjectId:{
    type: String,
    required: true
  },
  objectId:{
    type: String,
    required: true
  },
  verb:{
    type: String,
    require: true,
    enum: [
      'commented on',
      'liked',
      'disliked',
      'added a chapter to'
    ]
  },
  objectType:{
    type: String,
    require: true,
    enum: [
      'comment',
      'chapter',
      'book'
    ]
  },
  read:{
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Notification', notificationSchema)
