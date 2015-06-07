'use strict';

var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var ArticleController = {};

module.exports = ArticleController;

// Get all articles
ArticleController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.ArticleCollection, req, res);
};

// Create a new article
ArticleController.create = function(req, res) {
  ObjectController.create(Collections.ArticleCollection, req, res, 'Article');
};

// Get a article with an id
ArticleController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.ArticleCollection, req, res);
};

// Update an article
ArticleController.update = function(req, res) {
  ObjectController.update(Collections.ArticleCollection, req, res, 'Article');
};

// Delete an article
ArticleController.delete = function(req, res) {
  ObjectController.delete(Collections.ArticleCollection, req, res);
};
