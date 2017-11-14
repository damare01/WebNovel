const userToSocketMap = new Map()
const socketToUserMap = new Map()

var connect = function (io) {
  io.on('connection', (socket) => {

    socket.on('user', (user) => {
      userToSocketMap.set(user._id, socket)
      socketToUserMap.set(socket.id, user._id)
    })

    socket.on('disconnect', () => {
      const userId = socketToUserMap.get(socket.id)
      console.log('deleting ' + userId)
      socketToUserMap.delete(socket.id)
      userToSocketMap.delete(userId)
    })

  })


}

var emitMessage = function (userId, topic, data) {
  const socket = userToSocketMap.get(userId)
  if (socket) {
    socket.emit(topic, data)
  }
}

module.exports.connect = connect
module.exports.emitMessage = emitMessage
