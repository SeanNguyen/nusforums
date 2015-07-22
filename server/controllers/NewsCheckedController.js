'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var CheckedNewsController = {};

module.exports = CheckedNewsController;

// Get all CheckedNewss
CheckedNewsController.retrieve = function(req, res) {
  var id = req.query.id;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;

  Collections.CheckedNewsCollection.forge()
  .query(function(qb) {
    if (id && startDate && endDate) {
  	  qb.where('id', '=', id)
        .andWhere('timeStamp', '>=', startDate)
        .andWhere('timeStamp', '<=', endDate)
        .orderBy('timeStamp', 'ASC');
    } else {
      qb.orderBy('timeStamp', 'ASC');
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
  ObjectController.create(Collections.CheckedNewsCollection, req, res, 'CheckedNews');
};

// Get a CheckedNews with an id
CheckedNewsController.retrieveCheckedNews = function(req, res) {
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
