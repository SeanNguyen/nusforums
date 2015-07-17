'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var AssetPriceController = {};

module.exports = AssetPriceController;

// Get all AssetAssetPrices
AssetPriceController.retrieve = function(req, res) {

  var id = req.query.id;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var limit = req.query.limit;
  
  Collections.AssetPriceCollection.forge()
  .query(function(qb) {
    if (id && startDate && endDate && limit) {
  	  qb.where('id', '=', id)
        .andWhere('date', '>=', startDate)
        .andWhere('date', '<=', endDate)
        .orderBy('date', 'ASC')
        .limit(limit);
    } else {
      qb.limit(100);
    }
  })
  .fetch()
  .then(function(prices) {
    if (prices) {
  	  res.status(200).json(prices);
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


// Create a new AssetAssetPrice
AssetPriceController.create = function(req, res) {
  ObjectController.create(Collections.AssetPriceCollection, req, res, 'AssetPrice');
};

// Update an AssetAssetPrice
AssetPriceController.update = function(req, res) {
  ObjectController.update(Collections.AssetPriceCollection, req, res, 'AssetPrice');
};

// Delete an AssetAssetPrice
AssetPriceController.delete = function(req, res) {
  ObjectController.delete(Collections.AssetPriceCollection, req, res);
};
