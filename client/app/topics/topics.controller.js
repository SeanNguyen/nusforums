'use-strict';
var app = angular.module('ratingApp');

var STATE = {search: 'search', view: 'view'};

app.controller('TopicsController', function($rootScope, $scope) {
	$scope.state = STATE.view;
	$scope.search = {keyword: ''};
	$scope.showedTopics = $rootScope.dataController.getTopics();
	$scope.currentTopic = $scope.showedTopics[0];
	$scope.inputPost = new PostModel();

	//public methods
	$scope.onSearch = function() {
		var topics = $rootScope.dataController.getTopics();
		$scope.showedTopics = [];
		for (var i = topics.length - 1; i >= 0; i--) {
			var predictorName = topics[i].title.toLowerCase();
			var keyword = $scope.search.keyword.toLowerCase();
			if(predictorName.includes(keyword)) {
				$scope.showedTopics.push(topics[i]);
			}
		}
	}

	$scope.removeTopic = function(index) {
		var topicId = $scope.showedTopics[index].id;
		$scope.showedTopics.splice(index, 1);
		$rootScope.dataController.removeTopic(topicId);
	}

	$scope.getPreview = function(topic) {
		var thread = topic.thread;
		thread = thread.substring(0, 100) + '...';
		return thread;
	}

	$scope.getPredictorName = function(id) {
		var model = $rootScope.dataController.getPredictor(id);
		return model.name;
	}

	$scope.getAssetName = function(id) {
		var model = $rootScope.dataController.getAsset(id);
		return model.name;
	}

	$scope.viewTopic = function(id) {
		var topic = $rootScope.dataController.getTopic(id);
		$scope.currentTopic = topic;
		$scope.state = STATE.view;
	}

	$scope.closeTopic = function() {
		$scope.state = STATE.search;
	}

	$scope.addPost = function() {
		var predictor = $scope.currentTopic.predictor;
		var asset = $scope.currentTopic.asset;
		var prediction = $scope.currentTopic.prediction;
		var post = new PostModel('1', asset, predictor, prediction);
		$scope.currentTopic.posts.push(post);
	}
});