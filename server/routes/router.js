const AuthenticationController = require('./api/controllers/authentication'),
  express = require('express'),
  passportService = require('../config/passport'),
  passport = require('passport')

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false})
const requireLogin = passport.authenticate('local', {session: false})

module.exports = function(app) {
  // Initializing route groups
  const authRoutes = express.Router()
  let apiRoutes = express.Router()
  let api = require('./api/api')
  // =========================
  // Auth Routes
  // =========================

  // Registration route
  authRoutes.post('/register', AuthenticationController.register)

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login)

  authRoutes.post('/refreshToken', requireAuth, AuthenticationController.refresh)

  // Set auth routes as subgroup/middleware to apiRoutes
  app.use('/auth', authRoutes)

  // Set url for API group routes
  app.use('/api', api)
}
