'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var AssetController = {};

module.exports = AssetController;

// Get all Assets
AssetController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.AssetCollection, req, res);
};

// Create a new Asset
AssetController.create = function(req, res) {
  ObjectController.create(Collections.AssetCollection, req, res, 'Asset');
};

// Get a Asset with an id
AssetController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.AssetCollection, req, res);
};

// Update an Asset
AssetController.update = function(req, res) {
  ObjectController.update(Collections.AssetCollection, req, res, 'Asset');
};

// Delete an Asset
AssetController.delete = function(req, res) {
  ObjectController.delete(Collections.AssetCollection, req, res);
};
