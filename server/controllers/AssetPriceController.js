'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var AssetPriceController = {};

module.exports = AssetPriceController;

// Get all AssetAssetPrices
AssetPriceController.retrieveAll = function(req, res) {
  var query = req.query;
  var yahooID = query.yahooID;
  var startDate = query.startDate;
  var endDate = query.endDate;
  
  console.log('yahooID: ', yahooID);
  console.log('startDate: ', startDate);
  console.log('endDate: ', endDate);
  
  if (yahooID && startDate && endDate) {
    Collections.AssetPriceCollection.forge()
    .query(function(qb) {
  	  qb.where('yahooID', '=', yahooID).andWhere('date', '>=', startDate).andWhere('date', '<=', endDate);
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
  } else {
  	ObjectController.retrieveAll(Collections.AssetPriceCollection, req, res);
  }
 };


// Create a new AssetAssetPrice
AssetPriceController.create = function(req, res) {
  ObjectController.create(Collections.AssetPriceCollection, req, res, 'AssetPrice');
};

// Get a AssetAssetPrice with start and end date
/*AssetPriceController.retrieve = function(req, res) {
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var yahooID = req.query.yahooID;
  console.log('Start date is: ', startDate);
  console.log('End date is: ', endDate);

  Collections.AssetPriceCollection.forge()
  .query(function(qb) {
  	qb.where('yahooID', '=', yahooID).andWhere('date', '>=', startDate).andWhere('date', '<=', endDate);
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
};*/

// Update an AssetAssetPrice
AssetPriceController.update = function(req, res) {
  ObjectController.update(Collections.AssetPriceCollection, req, res, 'AssetPrice');
};

// Delete an AssetAssetPrice
AssetPriceController.delete = function(req, res) {
  ObjectController.delete(Collections.AssetPriceCollection, req, res);
};
