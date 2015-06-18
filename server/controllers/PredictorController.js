'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var PredictorController = {};

module.exports = PredictorController;

// Get all Predictors
PredictorController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.PredictorCollection, req, res);
};

// Create a new Predictor
PredictorController.create = function(req, res) {
  ObjectController.create(Collections.PredictorCollection, req, res, 'Predictor');
};

// Get a Predictor with an id
PredictorController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.PredictorCollection, req, res);
};

// Update an Predictor
PredictorController.update = function(req, res) {
  ObjectController.update(Collections.PredictorCollection, req, res, 'Predictor');
};

// Delete an Predictor
PredictorController.delete = function(req, res) {
  ObjectController.delete(Collections.PredictorCollection, req, res);
};