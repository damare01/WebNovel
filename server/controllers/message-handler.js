const jwt = require('jsonwebtoken')
const Redis = require('ioredis'),
      client = new Redis(process.env.REDIS_URL)

let io

let connect = function (io) {
  this.io = io
  io.on('connection', (socket) => {

    socket.on('user-auth', (token) => {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (!err) {
          const userId = decoded._id
          client.set(userId, socket.id)
          client.set(socket.id, userId)
        }
      })
    })

    socket.on('disconnect', () => {
      client.get(socket.id, (err, reply)=>{
        if(!err && reply){
          let userId = reply.toString()
          client.del(userId)
          client.del(socket.id)
        }
      })
    })

  })


}

let emitMessage = function (userId, topic, data) {
  if (this.io) {
    client.get(userId, (err, reply)=>{
      if(!err && reply){
        const socketId = reply.toString()
        this.io.to(socketId).emit(topic, data)
      }
    })
  }

}

module.exports.connect = connect
module.exports.emitMessage = emitMessage
