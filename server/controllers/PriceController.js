'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var PriceController = {};

module.exports = PriceController;

// Get all AssetPrices
PriceController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.PriceCollection, req, res);
};

// Create a new AssetPrice
PriceController.create = function(req, res) {
  ObjectController.create(Collections.PriceCollection, req, res, 'Price');
};

// Get a AssetPrice with an id
PriceController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.PriceCollection, req, res);
};

// Update an AssetPrice
PriceController.update = function(req, res) {
  ObjectController.update(Collections.PriceCollection, req, res, 'Price');
};

// Delete an AssetPrice
PriceController.delete = function(req, res) {
  ObjectController.delete(Collections.PriceCollection, req, res);
};
