const jwt = require('jsonwebtoken')
const userToSocketMap = new Map()
const socketToUserMap = new Map()

let connect = function (io) {
  io.on('connection', (socket) => {

    socket.on('user-auth', (token) => {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (!err) {
          const userId = decoded._id
          console.log(userId)
          userToSocketMap.set(userId, socket)
          socketToUserMap.set(socket.id, userId)
        }
      })
    })

    socket.on('disconnect', () => {
      const userId = socketToUserMap.get(socket.id)
      socketToUserMap.delete(socket.id)
      userToSocketMap.delete(userId)
    })

  })


}

let emitMessage = function (userId, topic, data) {
  const socket = userToSocketMap.get(userId)
  if (socket) {
    socket.emit(topic, data)
  }
}

module.exports.connect = connect
module.exports.emitMessage = emitMessage
