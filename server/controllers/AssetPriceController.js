'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var AssetPriceController = {};

module.exports = AssetPriceController;

// Get all AssetAssetPrices
AssetPriceController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.AssetPriceCollection, req, res);
};

// Create a new AssetAssetPrice
AssetPriceController.create = function(req, res) {
  ObjectController.create(Collections.AssetPriceCollection, req, res, 'AssetPrice');
};

// Get a AssetAssetPrice with an id
AssetPriceController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.AssetPriceCollection, req, res);
};

// Update an AssetAssetPrice
AssetPriceController.update = function(req, res) {
  ObjectController.update(Collections.AssetPriceCollection, req, res, 'AssetPrice');
};

// Delete an AssetAssetPrice
AssetPriceController.delete = function(req, res) {
  ObjectController.delete(Collections.AssetPriceCollection, req, res);
};
