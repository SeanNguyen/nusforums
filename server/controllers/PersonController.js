'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var PersonController = {};

module.exports = PersonController;

// Get all Persons
PersonController.index = function(req, res) {
  Person.find({}, function(err, person) {
    if (err) {
      return res.send('Error index: ' + err);
    } else {
      // respond to JSON
      res.format({
        json: function() {
          res.json(Person);
        }
      })
    }
  })
};

// Create a new Person
PersonController.create = function(req, res) {

  var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var wikiUrl= req.body.wikiUrl;
  var linkedinUrl = req.body.linkedinUrl;
  var currentEmployer = req.body.currentEmployer;
  var currentJobTitle = req.body.currentJobTitle;
  var currentJobInfo = req.body.currentJobInfo;
  var lastUpdated = req.body.lastUpdated;

  var person = new Person({
    id: id,
    firstName: firstName,
    lastName: lastName,
    wikiUrl: wikiUrl,
    linkedinUrl: linkedinUrl,
    currentEmployer: currentEmployer,
    currentJobTitle: currentJobTitle,
    currentJobInfo: currentJobInfo,
    lastUpdated: lastUpdated
  });

  person.save(function(err) {
    if (err) {
      console.log(err);
      res.send("Error: " + err);
    } else {
      res.json(Person);
    }
  })
};

// Get a Person with an id
PersonController.show = function(req, res) {
  
  Person.findById(req.params.id, function(err, person) {
    if (err) {
      res.send("GET error: " + err);
    } else {
      res.format({
        json: function() {
          res.json(person);
        }
      });
    }
  });
};

// Update an Person
PersonController.update = function(req, res) {
  // get content from req
  var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var wikiUrl= req.body.wikiUrl;
  var linkedinUrl = req.body.linkedinUrl;
  var currentEmployer = req.body.currentEmployer;
  var currentJobTitle = req.body.currentJobTitle;
  var currentJobInfo = req.body.currentJobInfo;
  var lastUpdated = req.body.lastUpdated;

  Person.findById(req.params.id, function(err, person) {
    person.update({
      id: id,
      firstName: firstName,
      lastName: lastName,
      wikiUrl: wikiUrl,
      linkedinUrl: linkedinUrl,
      currentEmployer: currentEmployer,
      currentJobTitle: currentJobTitle,
      currentJobInfo: currentJobInfo,
      lastUpdated: lastUpdated
    }, function(err, _person) {
      if (err) {
        res.send("Error update: " + err);
      } else {
        res.format({
          json: function() {
            res.json(_person);
          }
        });
      }
    });
  }); 
};

// Delete an Person
PersonController.delete = function(req, res) {
  Person.findById(req.params.id, function(err, person) {
    if (err) {
      res.send('Error delete: ' + err);
    } else {
      //remove from mongodb
      Person.remove(function(err, person) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            json: function() {
              res.json({message: 'deleted', item: person});
            }
          });
        }
      });
    }
  });
};