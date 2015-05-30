'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Asset = mongoose.model('Asset');
var AssetController = {};

module.exports = AssetController;

// Get all Assets
AssetController.index = function(req, res) {
  Asset.find({}, function(err, assets) {
    if (err) {
      return console.error(err);
    } else {
      // respond to JSON
      res.format({
        json: function() {
          res.json(assets);
        }
      })
    }
  })
};

// Create a new Asset
AssetController.create = function(req, res) {

  var id = req.body.id;
  var flag_stock = req.body.flag_stock;
  var flag_bond = req.body.flag_bond;
  var flag_index = req.body.flag_index;
  var flag_currency = req.body.flag_currency;
  var flag_commidities = req.body.flag_commidities;

  var asset = new Asset({
    id: id,
    flag_stock: flag_stock,
    flag_bond: flag_bond,
    flag_index: flag_index,
    flag_currency: flag_currency,
    flag_commidities: flag_commidities
  });

  asset.save(function(err) {
    if (err) {
      console.log(err);
      res.send("Error: " + err);
    } else {
      res.json(asset);
    }
  })
};

// Get a Asset with an id
AssetController.show = function(req, res) {
  
  Asset.findById(req.params.id, function(err, asset) {
    if (err) {
      res.send("GET error: " + err);
    } else {
      res.format({
        json: function() {
          res.json(asset);
        }
      });
    }
  });
};

// Update an Asset
AssetController.update = function(req, res) {
  // get content from req
  var id = req.body.id;
  var flag_stock = req.body.flag_stock;
  var flag_bond = req.body.flag_bond;
  var flag_index = req.body.flag_index;
  var flag_currency = req.body.flag_currency;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var price = req.body.price;

  Asset.findById(req.params.id, function(err, asset) {
    Asset.update({
      id: id,
      flag_stock: flag_stock,
      flag_bond: flag_bond,
      flag_index: flag_index,
      flag_currency: flag_currency,
      startDate: startDate,
      endDate: endDate,
      price: price
    }, function(err, _asset) {
      if (err) {
        res.send("Error update: " + err);
      } else {
        res.format({
          json: function() {
            res.json(_asset);
          }
        });
      }
    });
  }); 
};

// Delete an Asset
AssetController.delete = function(req, res) {
  Asset.findById(req.params.id, function(err, asset) {
    if (err) {
      res.send('Error delete: ' + err);
    } else {
      //remove from mongodb
      Asset.remove(function(err, asset) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            json: function() {
              res.json({message: 'deleted', item: asset});
            }
          });
        }
      });
    }
  });
};
