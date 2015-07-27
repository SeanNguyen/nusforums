'use-strict';

var app = angular.module('ratingApp');

app.run(function ($http, $rootScope) { 
	$http.get('/api/predictors').
	success(function(data, status, headers, config) {
		for (var i = data.length - 1; i >= 0; i--) {
			$rootScope.dataController.addPredictor(data[i]);
		};
	}).
	error(function(data, status, headers, config) {
	});

	$http.get('/api/assets').
	success(function(data, status, headers, config) {
		for (var i = data.length - 1; i >= 0; i--) {
			$rootScope.dataController.addAsset(data[i]);	
		};
	}).
	error(function(data, status, headers, config) {
	});

	$http.get('/api/users')
	.success(function(data, status, headers, config) {
      for (var i = 0; i < data.length; i++) {
      	$rootScope.dataController.addUser(data[i]);
      }
	})
	.error(function(data, status, headers, config) {
      console.log('Error when getting users');
	})
});

function DataController () {
	var predictors = [];
	
	var topics = [];

	var assets = [];

	var users = [];

	//public methods
	// PREDICTOR
	this.getPredictors = function () {
		//TODO: modify this with shadow copy (clone)
		return predictors;
	}

	this.getPredictor = function (id) {
		//TODO: modify this with shadow copy (clone)
		for (var i = predictors.length - 1; i >= 0; i--) {
			if(predictors[i].id === id) {
				return predictors[i];
			}
		};
	}

	this.addPredictor = function (model) {
		predictors.push(model);
	}

	this.removePredictor = function (id) {
		for (var i = predictors.length - 1; i >= 0; i--) {
			if(predictors[i].id === id) {
				predictors.splice(i, 1);
				break;
			}
		};
	}

	//TOPIC
	this.getTopics = function () {
		//TODO: modify this with shadow copy (clone)
		return topics;
	}

	this.getTopic = function (id) {
		//TODO: modify this with shadow copy (clone)
		for (var i = topics.length - 1; i >= 0; i--) {
			if(topics[i].id === id) {
				return topics[i];
			}
		};
	}

	this.addTopic = function (model) {
		topics.push(model);
	}

	this.removeTopic = function (id) {
		for (var i = topics.length - 1; i >= 0; i--) {
			if(topics[i].id === id) {
				topics.splice(i, 1);
				break;
			}
		};
	}

	//ASSET
	this.getAssets = function () {
		//TODO: modify this with shadow copy (clone)
		return assets;
	}

	this.getAsset = function (id) {
		//TODO: modify this with shadow copy (clone)
		for (var i = assets.length - 1; i >= 0; i--) {
			if(assets[i].id === id) {
				return assets[i];
			}
		};
	}

	this.addAsset = function (model) {
		assets.push(model);
	}

	this.removeAsset = function (id) {
		for (var i = assets.length - 1; i >= 0; i--) {
			if(assets[i].id === id) {
				assets.splice(i, 1);
				break;
			}
		};
	}

	// USER
	this.getUsers = function () {
		return users;
	}

	this.getUser = function (id) {
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].id === id) {
				return users[i];
			}
		};
	}

	this.addUser = function (model) {
		users.push(model);
	}

	this.removeUser = function (id) {
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].id === id) {
				users.splice(i, 1);
				break;
			}
		};
	}
};
