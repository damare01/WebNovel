let mongoose = require('mongoose')

let userCurrencySchema = mongoose.Schema({
  currencyId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  checked: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('UserCurrency', userCurrencySchema, 'user_currencies')
