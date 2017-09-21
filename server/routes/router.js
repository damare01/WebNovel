const AuthenticationController = require('./api/controllers/authentication'),
  express = require('express'),
  passportService = require('../config/passport'),
  passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false});
const requireLogin = passport.authenticate('local', { session: false});

module.exports = function(app) {
  // Initializing route groups
  const authRoutes = express.Router();
  var apiRoutes = express.Router();
  var api = require('./api/api');
  //=========================
  // Auth Routes
  //=========================

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Set auth routes as subgroup/middleware to apiRoutes
  app.use('/auth', authRoutes);

  // Set url for API group routes
  app.use('/api', requireAuth, api);

  app.get('*', requireAuth, (req,res)=>{
    if(req.user){
      res.sendFile("application.html");
    } else{
      res.send("You need to login boii");
    }
  })
};
