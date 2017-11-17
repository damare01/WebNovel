const Chapter = require('../../../models/chapter')
const UserCurrency = require('../../../models/userCurrency')
const Currency = require('../../../models/currency')


exports.updateLikedChapterCurrency = function (chapterId, incrementation, callback) {
  updateCurrency(chapterId, 'likes', incrementation, callback)
}

exports.incrementChapterViewsCurrency = function(chapterId, callback){
  updateCurrency(chapterId, 'views', 1, callback)
}

exports.incrementCommentsCurrency = function(chapterId, callback){
  updateCurrency(chapterId, 'comments', 1, callback)
}

let updateCurrency = function(chapterId, currencyName, incrementation, callback){
  callback = callback || function () {
  }
  Chapter.findOne({'_id': chapterId}, (err, chapter) => {
    if (err || !chapter) {
      callback(err)
    } else {
      const userId = chapter.author
      Currency.findOne({'name': currencyName}, (err2, currency) => {
        if (err2 || !currency) {
          callback(err2)
        } else {
          const currencyId = currency._id
          UserCurrency.findOneAndUpdate(
            {
              'currencyId': currencyId,
              'userId': userId
            },
            {
              $inc: {'amount': incrementation},
              $set: {'checked': false}
            },
            {
              upsert: true
            }, (err3) => {
              if (err3) {
                callback(err3)
              } else {
                callback(null)
              }
            })
        }
      })
    }
  })
}
