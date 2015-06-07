'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var PersonController = {};

module.exports = PersonController;

// Get all Persons
PersonController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.PersonCollection, req, res);
};

// Create a new Person
PersonController.create = function(req, res) {
  ObjectController.create(Collections.PersonCollection, req, res, 'Person');
};

// Get a Person with an id
PersonController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.PersonCollection, req, res);
};

// Update an Person
PersonController.update = function(req, res) {
  ObjectController.update(Collections.PersonCollection, req, res, 'Person');
};

// Delete an Person
PersonController.delete = function(req, res) {
  ObjectController.delete(Collections.PersonCollection, req, res);
};