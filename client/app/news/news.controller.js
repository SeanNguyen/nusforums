'use-strict';
var app = angular.module('ratingApp');

app.controller('NewsController', ['News', '$rootScope', '$scope', NewsController]);


function NewsController(News, $rootScope, $scope, $stateParams, news) {
    $scope.news = news;
}


// //OLD

// 	$scope.removeTopic = function(index) {
// 		var topicId = $scope.showedTopics[index].id;
// 		$scope.showedTopics.splice(index, 1);
// 		$rootScope.dataController.removeTopic(topicId);
// 	}

// 	$scope.getPreview = function(topic) {
// 		var thread = topic.headline;
// 		thread = thread.substring(0, 100) + '...';
// 		return thread;
// 	}

// 	$scope.getPredictorName = function(id) {
// 		var model = $rootScope.dataController.getPredictor(id);
// 		return model.name;
// 	}

// 	$scope.getAssetName = function(id) {
// 		var model = $rootScope.dataController.getAsset(id);
// 		return model.name;
// 	}

// 	$scope.viewTopic = function(id) {
// 		var topic = $rootScope.dataController.getTopic(id);
// 		$scope.currentTopic = topic;
// 		$scope.state = STATE.view;
// 	}

// 	$scope.closeTopic = function() {
// 		$scope.state = STATE.search;
// 	}

// 	$scope.addPost = function(inputPost) {
// 		if(!inputPost.predictor ||  !inputPost.asset || !inputPost.prediction) {
// 			alert("Please Fill All The Field");
// 			return;
// 		}
// 		var predictor = inputPost.predictor.originalObject.id;
// 		var asset = inputPost.asset.originalObject.id;
// 		var prediction = inputPost.prediction;

// 		//validation
// 		if(prediction && prediction.length > 0
// 			&& $rootScope.dataController.getPredictor(predictor)
// 			&& $rootScope.dataController.getAsset(asset)) {
// 			var post = new PostModel('1', asset, predictor, prediction);
// 			$scope.currentTopic.posts.push(post);			
// 		} else {
// 			alert("Please Fill The Correct Name !!!");
// 		}

// 	}