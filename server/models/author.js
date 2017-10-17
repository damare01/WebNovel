let mongoose = require('mongoose')

let authorSchema = mongoose.Schema({
  id: {
    type: String
  },
  penName: {
    type: String
  }
})

authorSchema.pre('save', function(next) {
  const author = this
  if(author.penName){
    return next()
  }
  if(!author.isModified('id')){
    return next()
  }
  User.findOne({_id: author.id}, (err, user)=>{
    author.penName = user.penName
    next()
  })
})

module.exports = mongoose.model('Author', authorSchema)
