'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var CheckedNewsController = {};

module.exports = CheckedNewsController;

// Get all CheckedNewss
CheckedNewsController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.CheckedNewsCollection, req, res);
};

// Create a new CheckedNews
CheckedNewsController.create = function(req, res) {
  ObjectController.create(Collections.CheckedNewsCollection, req, res, 'CheckedNews');
};

// Get a CheckedNews with an id
CheckedNewsController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.CheckedNewsCollection, req, res);
};

// Update an CheckedNews
CheckedNewsController.update = function(req, res) {
  ObjectController.update(Collections.CheckedNewsCollection, req, res, 'CheckedNews');
};

// Delete an CheckedNews
CheckedNewsController.delete = function(req, res) {
  ObjectController.delete(Collections.CheckedNewsCollection, req, res);
};
