'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AssetPrice = mongoose.model('AssetPrice');
var AssetPriceController = {};

module.exports = AssetPriceController;

// Get all AssetPrices
AssetPriceController.index = function(req, res) {
  AssetPrice.find({}, function(err, assetPrice) {
    if (err) {
      return console.error(err);
    } else {
      // respond to JSON
      res.format({
        json: function() {
          res.json(assetPrice);
        }
      })
    }
  })
};

// Create a new AssetPrice
AssetPriceController.create = function(req, res) {

  var id = req.body.id;
  var flag_stock = req.body.flag_stock;
  var flag_bond = req.body.flag_bond;
  var flag_index = req.body.flag_index;
  var flag_currency = req.body.flag_currency;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var price = req.body.price;

  var assetPrice = new AssetPrice({
    id: id,
    flag_stock: flag_stock,
    flag_bond: flag_bond,
    flag_index: flag_index,
    flag_currency: flag_currency,
    startDate: startDate,
    endDate: endDate,
    price: price
  });

  assetPrice.save(function(err) {
    if (err) {
      console.log(err);
      res.send("Error: " + err);
    } else {
      res.json(assetPrice);
    }
  })
};

// Get a AssetPrice with an id
AssetPriceController.show = function(req, res) {
  
  AssetPrice.findById(req.params.id, function(err, assetPrice) {
    if (err) {
      res.send("GET error: " + err);
    } else {
      res.format({
        json: function() {
          res.json(assetPrice);
        }
      });
    }
  });
};

// Update an AssetPrice
AssetPriceController.update = function(req, res) {
  // get content from req
  var id = req.body.id;
  var flag_stock = req.body.flag_stock;
  var flag_bond = req.body.flag_bond;
  var flag_index = req.body.flag_index;
  var flag_currency = req.body.flag_currency;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var price = req.body.price;

  AssetPrice.findById(req.params.id, function(err, assetPrice) {
    assetPrice.update({
      id: id,
      flag_stock: flag_stock,
      flag_bond: flag_bond,
      flag_index: flag_index,
      flag_currency: flag_currency,
      startDate: startDate,
      endDate: endDate,
      price: price
    }, function(err, _assetPrice) {
      if (err) {
        res.send("Error update: " + err);
      } else {
        res.format({
          json: function() {
            res.json(_assetPrice);
          }
        });
      }
    });
  }); 
};

// Delete an AssetPrice
AssetPriceController.delete = function(req, res) {
  AssetPrice.findById(req.params.id, function(err, assetPrice) {
    if (err) {
      res.send('Error delete: ' + err);
    } else {
      //remove from mongodb
      assetPrice.remove(function(err, assetPrice) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            json: function() {
              res.json({message: 'deleted', item: assetPrice});
            }
          });
        }
      });
    }
  });
};
