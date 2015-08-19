'use strict';
var q = require('q');

var Collections = require('../db/collection.js'); 
var ObjectController = require('./ObjectController.js');
var NewsController = {};

module.exports = NewsController;

// Get all Newss
NewsController.retrieveAll = function(req, res) {
  var keyword = '%' + req.query.keyword + '%';
  
  //get news by keywords
  Collections.NewsCollection.forge()
  .query(function(qb) {
    qb.where('headline', 'like', keyword)
  })
  .fetch()
  .then(function(news) {
    //if result empty then return
    if (!news) {
      console.log('Error: ', err);
      res.status(404).json(err);
      return;
    }
      
    var newsList = news.models;
    //if there is no isFresh parameter then return all the thing
    if(!req.query.isFresh) {
      res.status(200).json(newsList);
      return;
    }

    //filter all the fresh or not-fresh news to return
    var promises = [];
    for (var i = newsList.length - 1; i >= 0; i--) {
      var promise = isNewsChecked(newsList[i].id);
      promises.push(promise);
    };

    q.all(promises)
    .then(function (data) {
      //assume that the number of returned result is still the same as the number of news
      var results = [];
      var needFreshNews = false;
      if(req.query.isFresh === 'true') {
        needFreshNews = true;
      }
      for(var i = newsList.length - 1; i >= 0; i--) {
        var isFresh = !data[i];
        if(isFresh === needFreshNews) {
          results.push(newsList[i]);
        }
      }
      res.status(200).json(results);
    });
  })
  .catch(function(err) {
  	console.log('Error retrieve: ', err);
  	res.status(500).json(err);
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
function isNewsChecked(newsId) {
  return Collections.CheckedNewsCollection.forge()
  .query(function(qb) {
    qb.where('newsId', '=', newsId);
  })
  .fetch()
  .then(function(checkedNews) {
    if (checkedNews) {
      return true;
    } else {
      return false;
    }
  })
  .catch(function(err) {
    console.log('Error retrieve: ', err);
    return false;
  });
}