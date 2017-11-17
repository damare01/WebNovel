let mongoose = require('mongoose')

let currencySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Currency', currencySchema, 'currencies')
