'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var moment = require('moment');
var CheckedNewsController = {};

module.exports = CheckedNewsController;

// Get all CheckedNewss
CheckedNewsController.retrieve = function(req, res) {
  var assetId = req.query.assetId;
  var newsId = req.query.newsId;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var predictorId = req.query.predictorId;

  Collections.CheckedNewsCollection.forge()
  .query(function(qb) {
    if (assetId && startDate && endDate) {
  	  qb.where('assetId', '=', assetId)
        .andWhere('timeStamp', '>=', startDate)
        .andWhere('timeStamp', '<=', endDate)
    } else if (assetId) {
      qb.where('assetId', '=', assetId)
    } else if (newsId) {
      qb.where('newsId', '=', newsId);
    } else if (predictorId) {
      qb.where('predictorID', '=', predictorId);
    }
  })
  .fetch()
  .then(function(checkedNews) {
    if (checkedNews) {
  	  res.status(200).json(checkedNews);
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

// Create a new CheckedNews
CheckedNewsController.create = function(req, res) {
  req.body.timeStamp = moment().format("YY-MM-DD HH:MM:ss");
  ObjectController.create(Collections.CheckedNewsCollection, req, res, 'CheckedNews');
};

// Get a CheckedNews with an id
CheckedNewsController.retrieveCheckedNews = function(req, res) {
  ObjectController.retrieve(Collections.CheckedNewsCollection, req, res);
};

// Update an CheckedNews
CheckedNewsController.update = function(req, res) {
  req.body.timeStamp = moment(req.body.timeStamp, ['', 'YY-MM-DD HH:MM:ss'])
                        .format("YY-MM-DD HH:MM:ss");
  ObjectController.update(Collections.CheckedNewsCollection, req, res, 'CheckedNews');
};

// Delete an CheckedNews
CheckedNewsController.delete = function(req, res) {
  ObjectController.delete(Collections.CheckedNewsCollection, req, res);
};
