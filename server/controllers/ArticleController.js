
'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var ArticleController = {};

module.exports = ArticleController;

// Get all articles
ArticleController.index = function(req, res) {
  Article.find({}, function(err, articles) {
    if (err) {
      return console.error(err);
    } else {
      // respond to JSON
      res.format({
        json: function() {
          res.json(articles);
        }
      })
    }
  })
};

// Create a new article
ArticleController.create = function(req, res) {
  // get content from req
  var id = req.body.id;
  var headline = req.body.headline;
  var content = req.body.content;
  var url = req.body.url;
  var date = req.body.date;
  var source = req.body.source;
  var author = req.body.author;

  var article = new Article({
    id : id,
    headline : headline,
    content : content,
    url : url,
    date: date,
    source : source,
    author : author
  });

  article.save(function(err) {
    if (err) {
      console.log(err);
      res.send("Error: " + err);
    } else {
      res.json(article);
    }
  })
};

// Get a article with an id
ArticleController.show = function(req, res) {
  
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      res.send("GET error: There is a problem retrieving: " + err);
    } else {
      res.format({
        json: function() {
          res.json(article);
        }
      });
    }
  });
};

// Update an article
ArticleController.update = function(req, res) {
  // get content from req
  var id = req.body.id;
  var headline = req.body.headline;
  var content = req.body.content;
  var url = req.body.url;
  var date = req.body.date;
  var source = req.body.source;
  var author = req.body.author;

  Article.findById(req.params.id, function(err, article) {
    article.update({
      id: id,
      headline : headline,
      content : content,
      url : url,
      date : date,
      source : source,
      author : author
    }, function(err, _article) {
      if (err) {
        res.send("Error updating");
      } else {
        res.format({
          json: function() {
            res.json(_article);
          }
        });
      }
    });
  }); 
};

// Delete an article
ArticleController.delete = function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      res.send('Error deleting');
    } else {
      //remove from mongodb
      article.remove(function(err, article) {
        if (err) {
          return console.error(err);
        } else {
          res.format({
            json: function() {
              res.json({message: 'deleted', item: article});
            }
          });
        }
      });
    }
  });
};
