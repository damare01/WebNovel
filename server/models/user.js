let mongoose = require('mongoose')
let bcrypt = require('bcrypt-nodejs')
let CurrentlyReading = require('./currentlyReading').schema

let userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  penName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date},
  currentlyReading: {
    type: [CurrentlyReading],
    default: [],
  },
  role: {
    type: String,
    default: 'user'
  }

})

userSchema.pre('save', function (next) {
  const user = this,
    SALT_FACTOR = 5

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
