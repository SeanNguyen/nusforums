'use strict';

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
  	case 'Article':
  	  obj = {
  	    headline: req.body.headline,
  	    content: req.body.content,
  	    url: req.body.url,
  	    date: req.body.date,
  	    source: req.body.source,
  	    author: req.body.author
  	  };
  	  break;

  	case 'Asset':
  	  obj = {
  	  	flag_stock: req.body.flag_stock,
  	  	flag_bond: req.body.flag_bond,
  	  	flag_index: req.body.flag_index,
  	  	flag_currency: req.body.flag_currency,
  	  	flag_commidities: req.body.flag_commidities
  	  };
      break;

  	case 'Company':
      obj = {
      	name: req.body.name,
      	alias1: req.body.alias1,
      	alias2: req.body.alias2,
      	wiki_url: req.body.wiki_url,
      	linkedin_url: req.body.linkedin_url,
      	stock_sticker: req.body.stock_sticker
      };
      break;

  	case 'Price':
      obj = {
      	date: req.body.date,
      	price: req.body.price
      };
      break;

  	case 'Person':
      obj = {
      	first_name: req.body.first_name,
      	last_name: req.body.last_name,
      	wiki_url: req.body.wiki_url,
      	linkedin_url: req.body.linkedin_url,
      	employer: req.body.employer,
      	job_title: req.body.job_title,
      	job_info: req.body.job_info,
      };
      break;

  	default:
  	  obj = {};
  	  break; 
  }
  return obj;
};

module.exports = ObjectController;
