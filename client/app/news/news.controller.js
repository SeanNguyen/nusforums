'use-strict';
var app = angular.module('ratingApp');

app.controller('NewsController', ['News', '$rootScope', '$scope', 'news', 'Review', 'User', 'Predictor', 'Asset', NewsController]);


function NewsController(News, $rootScope, $scope, news, Review, User, Predictor, Asset) {
    $scope.news = news;
    $scope.reviews = [];
    $scope.upVote = upVote;
    $scope.downVote = downVote;
    $scope.input = { review: {} };

    //functions
    $scope.getPrediction = getPrediction;

    active();
    //private helper methods
    function active() {
    	Review.query({newsId: news.id}).$promise
    	.then(function(data) {
    		$scope.reviews = data;

    		//then for each review, get the info about the user
    		for (var i = $scope.reviews.length - 1; i >= 0; i--) {
    			var review = $scope.reviews[i];

	    		review.user = User.get({ id: review.userID });	
	    		review.predictor = Predictor.get({ id: review.predictorID });	
	    		review.asset = Asset.get({ id: review.assetID });	
    		};
    	});
    }

    function getPrediction(review) {
    	if(review.CannotTell === 1) {
    		return 'Cannot Tell';
    	} else if (review.NoPrediction === 1) {
    		return 'No Prediction';
    	} else {
    		return review.upDown;
    	}
    }

    function upVote(review) {
    	review.upVote++;
    	review.$update();
    }

    function downVote(review) {
    	review.downVote++;
    	review.$update();	
    }
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