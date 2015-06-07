'use strict';
var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var CompanyController = {};

module.exports = CompanyController;

// Get all Companys
CompanyController.retrieveAll = function(req, res) {
  ObjectController.retrieveAll(Collections.CompanyCollection, req, res);
};

// Create a new Company
CompanyController.create = function(req, res) {
  ObjectController.create(Collections.CompanyCollection, req, res, 'Company');
};

// Get a Company with an id
CompanyController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.CompanyCollection, req, res);
};

// Update an Company
CompanyController.update = function(req, res) {
  ObjectController.update(Collections.CompanyCollection, req, res, 'Company');
};

// Delete an Company
CompanyController.delete = function(req, res) {
  ObjectController.delete(Collections.CompanyCollection, req, res);
};
