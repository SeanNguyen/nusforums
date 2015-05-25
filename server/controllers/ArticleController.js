var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Article = mongoose.require('Article');
var ArticleController = {};

module.exports = ArticleController;

// make sure every request 
// that hits this controller will pass through these functions
router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

ArticleController.create = function(req, res, next) {
	
	var newArticle = new Article(req.body);

	//save the article
	newArticle.save(function(err) {
		if (err) {
			throw err;
			console.log('Error');
		}

		console.log('Article created');
	});
};

ArticleController.retrieveAll = function(req, res, next) {
	Article.find({}, function(err) {
		if (err) {
			throw err;
		}
	});
}

ArticleController.findByID = function(req, res, next) {
	var objectId = req.params.objectId;

	Article.findById(objectId, function(err) {
		if (err) {
			throw err;
		}
	});
}

ArticleController.update = function(req, res, next) {

}

ArticleController.delete = function(req, res, next) {
  
}

