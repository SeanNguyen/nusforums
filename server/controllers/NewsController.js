'use strict';

var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var NewsController = {};

module.exports = NewsController;

// Get all Newss
NewsController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.NewsCollection, req, res);
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
