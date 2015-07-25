'use strict';

var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var NewsController = {};

module.exports = NewsController;

// Get all Newss
NewsController.retrieveAll = function(req, res) {
  var keyword = '%' + req.query.keyword + '%';
  
  Collections.NewsCollection.forge()
  .query(function(qb) {
    qb.where('headline', 'like', keyword)
  })
  .fetch()
  .then(function(news) {
    if (news) {
  		res.status(200).json(news);
  	} else {
    	console.log('Error: ', err);
    	res.status(404).json(err);
  	}
  })
  .catch(function(err) {
  	console.log('Error retrieve: ', err);
  	res.status(500).json(err);
  });
};

// Create a new News
NewsController.create = function(req, res) {
  ObjectController.create(Collections.NewsCollection, req, res, 'News');
};

// Get a News with an id
NewsController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.NewsCollection, req, res);
};

// Update an News
NewsController.update = function(req, res) {
  ObjectController.update(Collections.NewsCollection, req, res, 'News');
};

// Delete an News
NewsController.delete = function(req, res) {
  ObjectController.delete(Collections.NewsCollection, req, res);
};
