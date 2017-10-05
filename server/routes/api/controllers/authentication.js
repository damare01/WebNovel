const jwt = require('jsonwebtoken'),
  crypto = require('crypto'),
  User = require('../../../models/user');

var generateToken = function(user) {
  return jwt.sign(user, process.env.SECRET, {
    expiresIn: 604800 // a week in seconds
  });
}

var setUserInfo = function(request) {
  return {
    _id: request._id,
    fullName: request.fullName,
    email: request.email,
    penName: request.penName
  };
};

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: generateToken(userInfo)
  });
}


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;
  const penName = req.body.penName;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!fullName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    let user = new User({
      email: email,
      password: password,
      fullName: fullName,
      penName: penName
    });

    user.save(function(err, user) {
      if (err) {
        res.status(500).send({});
      }

      // Respond with JWT if user was created

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo)
      });
    });
  });
}

//========================================
// Authorization Middleware
//========================================

// Role authorization check
/*exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}*/
