let mongoose = require('mongoose')

let userBadgeSchema= mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  badge_id: {
    type: String,
    required: true
  }
})

userBadgeSchema.index({user_id: 1, badge_id: 1 }, { unique: true });

module.exports = mongoose.model('UserBadge', userBadgeSchema, 'user_badges')
