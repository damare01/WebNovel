let mongoose = require('mongoose')
let currencyThresholdSchema = require('./currencyThreshold').schema

let badgeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  currency_thresholds:{
    type: [currencyThresholdSchema],
    required: true
  }
})

module.exports = mongoose.model('Badge', badgeSchema, 'badges')
