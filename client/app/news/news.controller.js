'use-strict';
var app = angular.module('ratingApp');

app.controller('NewsController', ['News', '$rootScope', '$scope', 'news', 'Review', 'User', 'Predictor', 'Asset', 'GlobalData', '$http', NewsController]);


function NewsController(News, $rootScope, $scope, news, Review, User, Predictor, Asset, GlobalData, $http) {
    $scope.news = news;
    $scope.reviews = [];
    $scope.upVote = upVote;
    $scope.downVote = downVote;
    $scope.input = { review: {} };
    $scope.cache = { predictors: [], assets: [] };

    //functions
    $scope.getPrediction = getPrediction;
    $scope.addReview = addReview;

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

    	//query predictors and assets at the same time
    	cacheAllPredictor();
    	cacheAllAsset();
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

    function addReview(input) {
    	//check for ligin status
    	var currentUser = GlobalData.getCurrentUser();
    	if(!currentUser) {
    		alert('You have to log in to add a review!');
    		return;
    	}
    	if(!validateInput(input)) {
			alert('Please submit a valid review');
    		return;
    	}
    	var review = new Review(input.review);;
    	review.newsID = $scope.news.id;
    	review.predictorID = $scope.input.predictor.originalObject.id;
    	review.assetID = $scope.input.asset.originalObject.id;
    	review.userID = GlobalData.getCurrentUser().id;
        review.timeStamp = moment.utc().format("YY-MM-DD HH:MM:ss");

    	review.$save(function() {
    		//add to ui
	    	review.user = User.get({ id: review.userID });	
    		review.predictor = Predictor.get({ id: review.predictorID });	
    		review.asset = Asset.get({ id: review.assetID });	
    	});

    	$scope.reviews.push(review);
		$scope.input = { review: {} };	
    }

    function validateInput(input) {
    	if(!input.predictor || !input.predictor.originalObject.id) {
    		return false;
    	}
    	if(!input.review.assetNotAvailabe && (!input.asset || !input.asset.originalObject.id)) {
    		return false;
    	}
    	if((!input.review.CannotTell || !input.review.NoPrediction) && !input.review.upDown) {
    		return false;
    	}
    	return true;
    }

    function cacheAllPredictor() {
		$http.get('/api/predictors').
		success(function(data, status, headers, config) {
			$scope.cache.predictors = data;
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		});
    }

    function cacheAllAsset() {
    	$http.get('/api/assets').
		success(function(data, status, headers, config) {
			$scope.cache.assets = data;
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		});
    }
}