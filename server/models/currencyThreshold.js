let mongoose = require('mongoose')

let currencyThresholdSchema = mongoose.Schema({
  currency_id: {
    type: String,
    required: true
  },
  threshold: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('CurrencyThreshold', currencyThresholdSchema)
