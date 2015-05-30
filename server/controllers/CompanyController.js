'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var CompanyController = {};

module.exports = CompanyController;

// Get all Companys
CompanyController.index = function(req, res) {
  Company.find({}, function(err, company) {
    if (err) {
      return res.send('Error index: ' + err);
    } else {
      // respond to JSON
      res.format({
        json: function() {
          res.json(company);
        }
      })
    }
  })
};

// Create a new Company
CompanyController.create = function(req, res) {

  var id = req.body.id;
  var name = req.body.name;
  var alias1 = req.body.alias1;
  var alias2 = req.body.alias2;
  var wikiUrl= req.body.wikiUrl;
  var linkedinUrl = req.body.linkedinUrl;
  var stockSticker = req.body.stockSticker;
  
  var company = new Company({
    id: id,
    name: name,
    alias1: alias1,
    alias2: alias2,
    wikiUrl: wikiUrl,
    linkedinUrl: linkedinUrl,
    stockSticker: stockSticker
  });

  company.save(function(err) {
    if (err) {
      console.log(err);
      res.send("Error: " + err);
    } else {
      res.json(company);
    }
  })
};

// Get a Company with an id
CompanyController.show = function(req, res) {
  
  Company.findById(req.params.id, function(err, company) {
    if (err) {
      res.send("GET error: " + err);
    } else {
      res.format({
        json: function() {
          res.json(company);
        }
      });
    }
  });
};

// Update an Company
CompanyController.update = function(req, res) {
  // get content from req
  var id = req.body.id;
  var name = req.body.name;
  var alias1 = req.body.alias1;
  var alias2 = req.body.alias2;
  var wikiUrl= req.body.wikiUrl;
  var linkedinUrl = req.body.linkedinUrl;
  var stockSticker = req.body.stockSticker;

  Company.findById(req.params.id, function(err, company) {
    company.update({
      id: id,
      name: name,
      alias1: alias1,
      alias2: alias2,
      wikiUrl: wikiUrl,
      linkedinUrl: linkedinUrl,
      stockSticker: stockSticker
    }, function(err, _company) {
      if (err) {
        res.send("Error update: " + err);
      } else {
        res.format({
          json: function() {
            res.json(_company);
          }
        });
      }
    });
  }); 
};

// Delete an Company
CompanyController.delete = function(req, res) {
  Company.findById(req.params.id, function(err, company) {
    if (err) {
      res.send('Error delete: ' + err);
    } else {
      //remove from mongodb
      company.remove(function(err, company) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            json: function() {
              res.json({message: 'deleted', item: company});
            }
          });
        }
      });
    }
  });
};