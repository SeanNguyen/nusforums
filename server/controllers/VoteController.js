'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var VoteController = {};

// Get all Predictors
VoteController.retrieveAll = function(req, res) {
  if(req.query.userId && req.query.newsCheckId) {
	Collections.VoteCollection.forge()
	  .query(function(qb) {
	    qb.where('userId', '=', req.query.userId)
	    .andWhere('newsCheckId', '=', req.query.newsCheckId);
	  })
	  .fetch()
	  .then(function(votes) {
	  	if (votes) {
	  		res.status(200).json(votes);
	  	} else {
	  		console.log('Error retrieve: ', err);
	  		res.status(404).json(err);
	  	}
	  });
  } else {
	ObjectController.retrieveAll(Collections.VoteCollection, req, res);
  }
};

// Create a new Predictor
VoteController.create = function(req, res) {
  ObjectController.create(Collections.VoteCollection, req, res, 'Vote');
};

// Get a Predictor with an id
VoteController.retrieve = function(req, res) {
	ObjectController.retrieve(Collections.VoteCollection, req, res);
};

// Update an Predictor
VoteController.update = function(req, res) {
  ObjectController.update(Collections.VoteCollection, req, res, 'Vote');
};

// Delete an Predictor
VoteController.delete = function(req, res) {
  ObjectController.delete(Collections.VoteCollection, req, res);
};

module.exports = VoteController;