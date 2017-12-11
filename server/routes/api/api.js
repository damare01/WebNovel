let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let passport = require('passport')

let chapters = require('./chapters')
let books = require('./books')
let users = require('./users')
let likes = require('./likes')
let comments = require('./comments')
let notifications = require('./notifications')
let badges = require('./badges')
let edges = require('./edges')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true, promiseLibrary: global.Promise})
let db = mongoose.connection

const requireAuth = passport.authenticate('jwt', {session: false})

db.once('open', () => {
  console.log('Connected to db')
  router.use('/chapters', chapters)
  router.use('/books', books)
  router.use('/users', users)
  router.use('/likes', likes)
  router.use('/comments', comments)
  router.use('/notifications', notifications)
  router.use('/badges', badges)
  router.use('/edges', edges)
})

let swaggerJSDoc = require('swagger-jsdoc')
let swaggerDefinition = {
  info: {
    title: 'WebNovel API',
    version: '0.0.1',
    description: 'APIs available for WebNovel',
  },
  host: 'localhost:8080',
  basePath: '/api/',
}

let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./server/routes/api/*.js'],
}

let swaggerSpec = swaggerJSDoc(options)
router.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

router.get('/', (req, res) => {
  res.send('Error: No parameters')
})

module.exports = router
