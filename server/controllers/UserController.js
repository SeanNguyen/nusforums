'use strict';

var UserController = {};
var Bcrypt = require('bcrypt');
var Crypto = require('crypto');
var Promise = require('bluebird');
var Collections = require('../db/collection.js');

UserController.login = function(req, res) {
  var password = req.body.password;
  if(req.body.password) {
    password = password.trim();
  }

  var email = req.body.email;
  if(req.body.email) {
    email = email.trim();
  }

  var facebookId = req.body.facebookId;
  if(req.body.facebookId) {
    facebookId = facebookId.trim();
  }

  var googleId = req.body.googleId;
  if(req.body.googleId) {
    googleId = googleId.trim();
  }

  Collections.UserCollection.forge()
  .query(function(qb) {
    if (email && password) {
  	  qb.where('email', '=', email);
    } else if (facebookId) {
      qb.where('facebookId', '=', facebookId);
    } else if (googleId) {
      qb.where('googleId', '=', googleId);
    } else {
      return Promise.reject('no-authentication');
    }
  })
  .fetchOne()
  .then(function(user) {
  	if (user) {
  	  if (password && !Bcrypt.compareSync(password, user.get('password'))) {
        Promise.reject('password-incorrect');
      }

	  	// if user has a token
	  	if (user.get('token')) {
	  	  return Promise.resolve(user);
	  	} else {
	  	  // no token
        return user.save({token: createRandomToken()});
	  	}
  	} else {
  	  return Promise.reject('user_not_found');
  	}
  })
  .then(function(user) {
    user = removePasswordFromUserData(user);
    res.status(200).json(user);
  })
  .catch(function(err) {
  	console.log('Error validation: ', err);
    res.status(400).json({error: err});
  });
};

UserController.logout = function(req, res) {
  Collections.UserCollection.forge()
  .query(function(qb) {
  	qb.where('token', '=', req.body.token);
  })
  .fetchOne()
  .then(function(user) {
  	user.save({token: null});
  	res.status(200).json({message: 'logout'});
  })
  .catch(function(err) {
  	console.log('Error log out: ', err);
  	res.status(500).json({error: err.message});
  });
};

UserController.retrieve = function(req, res) {
  // get the users by number of upvotes
  var byUpVotes = req.query.upvotes;

  // get the users by number of downvotes
  var byDownVotes = req.query.downvotes;

  Collections.UserCollection.forge()
  .query(function(qb) {
    if (byUpVotes) {
      qb.orderBy('nOfUpVotesReceived', 'DESC').limit(byUpVotes);
    } else if (byDownVotes) {
      qb.orderBy('nOfDownVotesReceived', 'DESC').limit(byDownVotes);
    } else {
      qb.orderBy('nOfUpVotesReceived', 'DESC').limit(20);
    }
  })
  .fetch()
  .then(function(result) {
    result = result.map(removePasswordFromUserData);
    res.status(200).json(result); 
  })
  .catch(function(err) {
  	console.log('Error when getting all users: ', err);
  	res.status(500).json(err);
  })
};

UserController.create = function(req, res) {
  // hash the password
  var password = req.body.password || '';
  password = password.trim();
  
  Collections.UserCollection.forge()
  .create({
  	email: req.body.email.trim().toLowerCase(),
    role: req.body.role,
    nOfNewsTagged: 0,
    nOfUpVotes: 0,
    nOfDownVotes: 0,
    nOfUpVotesReceived: 0,
    nOfDownVotesReceived: 0,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    nickNameOnline: req.body.nickNameOnline,
    signupDate: req.body.signupDate, // get now
    photo: req.body.photo,
    gender: req.body.gender,
    age: req.body.age,
    employer1: req.body.employer1,
    employer2: req.body.employer2,
    employer3: req.body.employer3,
    facebookId: req.body.facebookId,
    googleId: req.body.googleId,
    admin: req.body.admin,
  	password: hashPassword(password)
  })
  .then(function(result) {
    var result = removePasswordFromUserData(result);
  	res.status(200).json(result);
  })
  .catch(function(err) {
  	res.status(500).json(err);
  });
};

UserController.retrieveUser = function(req, res) {
  Collections.UserCollection.forge()
  .query(function(qb) {
  	qb.where('id', '=', req.params.id);
  })
  .fetchOne()
  .then(function(result) {
  	if (result) {
  	  result = removePasswordFromUserData(result);
  	  res.status(200).json(result);
  	} else {
  	  res.status(400).json({});
  	}
  })
};

UserController.update = function(req, res) {
  Collections.UserCollection.forge()
  .query(function(qb) {
  	qb.where('id', '=', req.params.id);
  })
  .fetchOne(function(user) {
  	if (user) {
  	  user.save({
  	  	name: req.body.name || user.get('name'),
  	  	email: req.body.email || user.get('email')
  	  })
  	  .then(function(result) {
  	  	result = removePasswordFromUserData(result)
  	  	res.status(200).json(result);
  	  })
  	  .catch(function(err) {
  	  	console.log('Error update user: ', err);
  	  	res.status(500).json(err);
  	  })
  	} else {
  	  res.status(404).json({});
  	}
  })
  .catch(function(err) {
  	console.log('Error update user: ', err);
  	res.status(500).json(err);
  })
};

UserController.delete = function(req, res) {
  Collections.UserCollection.forge()
  .query(function(qb) {
  	qb.where('id', '=', req.params.id);
  })
  .fetchOne({
  	require: true
  })
  .then(function(user) {
  	if (user) {
  	  user.destroy()
  	  .then(function() {
  		res.status(200).json({});
  	  })
  	  .catch(function(err) {
  		console.log('Error delete user: ', err);
  		res.status(500).json(err);
  	  });
  	} else {
  		console.log('Error delete user: ', err);
  		res.status(404).json({});
  	}
  })
};

// remove password so that it will not return password in fetch
var removePasswordFromUserData = function(user) {
  var userObj = user.toJSON();
  if (userObj.hasOwnProperty('password')) {
  	delete(userObj.password);
  }
  return userObj;
};

var hashPassword = function(password) {
  return Bcrypt.hashSync(password, 10);
};

var createRandomToken = function() {
  return Crypto.randomBytes(64).toString('hex');
}

module.exports = UserController;
