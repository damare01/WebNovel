var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var chapters = require('./chapters');
var books = require('./books');
var users = require('./users');

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true, promiseLibrary: global.Promise});
var db = mongoose.connection;

const requireAuth = passport.authenticate('jwt', {session: false});

db.once('open', () => {
  console.log('Connected to db');
  router.use('/chapters', chapters);
  router.use('/books', books);
  router.use('/users', users);
});

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
  info: {
    title: 'WebNovel API',
    version: '0.0.1',
    description: 'APIs available for WebNovel'
  },
  host: 'localhost:8080',
  basePath: '/api/'
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./server/routes/api/*.js']
};

var swaggerSpec = swaggerJSDoc(options);
router.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.get('/', (req, res) => {
  res.send('Error: No parameters')
});

module.exports = router;
