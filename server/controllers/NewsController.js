'use strict';
var q = require('q');
var mysql = require("mysql");

var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var NewsController = {};

module.exports = NewsController;

//query parameters
//keyword: search keywords
//isFresh: is there any check for this news
//asset: asset name query
//predictor: predictor name query

// Get all Newss
NewsController.retrieveAll = function(req, res) {
  var connection = connectToDb();
  var query = buildQuery(req.query.isFresh, req.query.keyword, req.query.predictor, req.query.asset);
  connection.query(query, function(err,rows){
    if(err) {
      console.log('Error: ', err);
      res.status(500).json(err);
    }
    res.status(200).json(rows);
  });
};

// Create a new News
NewsController.create = function(req, res) {
  ObjectController.create(Collections.NewsCollection, req, res, 'News');
};

// Get a News with an id
NewsController.retrieve = function(req, res) {
  ObjectController.retrieve(Collections.NewsCollection, req, res);
};

// Update an News
NewsController.update = function(req, res) {
  ObjectController.update(Collections.NewsCollection, req, res, 'News');
};

// Delete an News
NewsController.delete = function(req, res) {
  ObjectController.delete(Collections.NewsCollection, req, res);
};

//private helper methods
function connectToDb() {
  var con = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "123456",
    database: "forumdb"
  });
  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });
  return con;
}

function buildQuery(isFresh, keyword, predictorName, assetName) {
  if(isFresh === 'true') {
    return "SELECT * FROM news WHERE news.headline LIKE '%" + keyword + "%' AND not exists (SELECT * FROM news_checked, predictor WHERE news.id = news_checked.newsID)";
  } else if(isFresh === 'false') {
    var query = "SELECT * FROM news WHERE news.headline LIKE '%" + keyword + "%' AND  exists (SELECT * FROM news_checked, predictor, asset WHERE news.id = news_checked.newsID ";
    if(predictorName) {
      query += "AND predictor.id = news_checked.predictorID AND predictor.commonName LIKE '%" + predictorName + "%'";
    }
    if(assetName) {
      query += "AND asset.id = news_checked.assetID AND asset.assetName LIKE '%" + assetName + "%'";
    }
    query += ")";
    return query;
  } else {
    return "SELECT * FROM news";
  }
}