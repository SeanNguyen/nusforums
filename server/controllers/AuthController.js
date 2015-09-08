'use strict';
var Model = require('./UserController.js');
var Collections = require('../db/collection.js');
var AuthController = {};

module.exports = AuthController;

AuthController.requireUser = function() {
  return function(req, res, next) {
  	var token;
    var facebookId;
    var googleId;

    // authenticate by googleId/ facebookId
    if (req.body.facebookId) {
      facebookId = req.body.facebookId;
    };

    if (req.body.googleId) {
      googleId = req.body.googleId;
    };

  	var token_method = 'NONE';
  	if (req.body.token) {
  	  token = req.body.token;
  	  token_method = 'BODY';
  	} else if (req.query.token) {
  	  token = req.query.token;
  	  token_method = 'QUERY';
  	} else if (req.headers.token) {
  	  token = req.headers.token;
  	  token_method = 'HEADER';
  	}

  	token_method += '_TOKEN';
  	console.log('Auth method: ' + token_method + '-' + req.url);

  	if (token || facebookId || googleId) {
  	  Collections.UserCollection.forge()
  	  .query(function(qb) {
        if (token) {
  	  	  qb.where('token', '=', token);
        } else if (facebookId) {
          qb.where('facebookId', '=', facebookId);
        } else if (googleId) {
          qb.where('googleId', '=', googleId);
        }
  	  })
  	  .fetchOne()
  	  .then(function(user) {
  	  	if (user) {
  	  	  // keep a copy of user for future use
  	  	  req.user = user;
  	  	  next();
  	  	} else {
  	  		res.status(404).json({error: 'user_not_found'});
  	  	}
  	  })
  	  .catch(function(err) {
  	  	res.status(500).json({error: err.message});
  	  });
    } else {
  	  res.status(400).json({error: 'require_token or googleId/facebookId'});
  	}
  };
};
