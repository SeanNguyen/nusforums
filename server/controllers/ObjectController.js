'use strict';

var moment = require('moment');

var ObjectController = {};

ObjectController.retrieveAll = function(objectCollection, req, res) {
  objectCollection.forge()
  .fetch()
  .then(function(result) {
  	res.status(200).json(result);
  })
  .catch(function(err) {
  	console.log('Error retrieve all: ', err);
  	res.status(500).json(err);
  });
};

ObjectController.create = function(objectCollection, req, res, objectName) {
  objectCollection.forge()
  .create(ObjectController.getObjectFromRequest(req, objectName))
  .then(function(result) {
  	res.status(200).json(result);
  })
  .catch(function(err) {
  	console.log('Error create: ', err);
  	res.status(500).json(err);
  })
};

ObjectController.retrieve = function(objectCollection, req, res) {
  objectCollection.forge()
  .query(function(qb) {
  	qb.where('id', '=', req.params.id);
  })
  .fetchOne()
  .then(function(object) {
  	if (object) {
  		res.status(200).json(object);
  	} else {
  		console.log('Error retrieve: ', err);
  		res.status(404).json(err);
  	}
  })
  .catch(function(err) {
  	console.log('Error retrieve: ', err);
  	res.status(500).json(err);
  });
};

ObjectController.update = function(objectCollection, req, res, objectName) {
  objectCollection.forge()
  .query(function(qb) {
  	qb.where('id', '=', req.params.id);
  })
  .fetchOne({
  	require: true
  })
  .then(function(object) {
  	object.save(ObjectController.getObjectFromRequest(req, objectName))
  	.then(function(result) {
  		res.status(200).json(result);
  	})
  	.catch(function(err) {
  		console.log('Error udpate: ', err);
  		res.status(500).json(err);
  	});
  })
  .catch(function(err) {
  	console.log('Error update: ', err);
  	res.status(500).json(err);
  });
};

ObjectController.delete = function(objectCollection, req, res) {
  objectCollection.forge()
  .query(function(qb) {
  	qb.where('id', '=', req.params.id);
  })
  .fetchOne({
  	require: true
  })
  .then(function(object) {
  	object.destroy()
  	.then(function() {
  	  res.status(200).json({});
  	})
  	.catch(function(err) {
      console.log('Error delete: ', err);
  	  res.status(500).json(err);
  	})
  })
  .catch(function(err) {
  	console.log('Error delete: ', err);
  	res.status(500).json(err);
  });
};

ObjectController.getObjectFromRequest = function(req, objectName) {
  var obj;

  switch (objectName) {
  	case 'News':
  	  obj = {
  	    headline: req.body.headline,
  	    content: req.body.content,
  	    date: req.body.date,
  	    author: req.body.author,
        source: req.body.source,
        url: req.body.url,
        BYLINE: req.body.BYLINE,
        DATELINE: req.body.DATELINE,
        LENGTH: req.body.LENGTH,
        PUBLICATION: req.body.PUBLICATION,
        SECTION: req.body.SECTION,
        COMPANY: req.body.COMPANY,
        GEOGRAPHIC: req.body.GEOGRAPHIC,
        INDUSTRY: req.body.INDUSTRY,
        ORGANIZATION: req.body.ORGANIZATION,
        PERSON: req.body.PERSON,
        SUBJECT: req.body.SUBJECT,
        TICKER: req.body.TICKER
  	  };
  	  break;
      
  	case 'Asset':
  	  obj = {
        assetName: req.body.assetName,
        assetType: req.body.assetType,
        assetRegion: req.body.assetRegion,
        otherID: req.body.otherID,
        description: req.body.description,
        displayName: req.body.displayName,
        ticker1: req.body.ticker1,
        ticker2: req.body.ticker2,
        ticker3: req.body.ticker3,
        ticker4: req.body.ticker4,
        ticker5: req.body.ticker5
  	  };
      break;

  	case 'CheckedNews':
      obj = {
      	newsID: req.body.newsID,
        predictorID: req.body.predictorID,
        userID: req.body.userID,
        assetID: req.body.assetID,
        upDown: req.body.upDown,
        time: req.body.time,
        assetNotAvailable: req.body.assetNotAvailable,
        CannotTell: req.body.CannotTell,
        NoPrediction: req.body.NoPrediction,
        timeStamp: req.body.timeStamp,
        remarks: req.body.remarks,
        downVote: req.body.downVote,
        upVote: req.body.upVote,
        targetPrice: req.body.targetPrice,
        original_sentence: req.body.original_sentence
      };
      break;

  	case 'AssetPrice':
      obj = {
      	yahooID: req.body.yahooID,
        date: req.body.date,
        open: req.body.open,
        high: req.body.high,
        low: req.body.low,
        close: req.body.close,
        volume: req.body.volume,
        adjClose: req.body.adjClose
      };
      break;

  	case 'Predictor':
      obj = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        commonName: req.body.commonName,
        currentTitle: req.body.currentTitle,
        description: req.body.description,
        photo: req.body.photo,
        wiki_URL: req.body.wiki_URL
      };
      break;

    case 'Vote':
      obj = {
        userId: req.body.userId,
        newsCheckId: req.body.newsCheckId,
        isUpVote: req.body.isUpVote
      };
      break;

  	default:
  	  obj = {};
  	  break; 
  }
  return obj;
};

module.exports = ObjectController;
