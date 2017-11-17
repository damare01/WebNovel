const Redis = require('ioredis')
const client = new Redis(process.env.REDIS_URL)
const io = require('socket.io-emitter')(client)


setInterval(() => {
  const notification = {
    actorId: '59cb9daa4c7248c29487dac3',
    created: '2017-11-16T12:59:15.947Z',
    objectId: '5a00695b671e270efc3935cb',
    objectType: 'chapter',
    read: false,
    subjectId: '59c3995ddd8415653e5ebc87',
    verb: 'disliked',
    __v: 0,
    _id: '5a0d8ba33c8983286d9d2acf'
  }
  client.get('59c3995ddd8415653e5ebc87', (err, reply) => {
    if (!err && reply) {
      const socketId = reply.toString()
      io.to(socketId).emit('notification', notification)
    }
  })
}, 5 * 1000)



