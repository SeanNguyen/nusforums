'use-strict';
var app = angular.module('ratingApp');

app.controller('NewsController', ['News', '$rootScope', '$scope', 'news', 'Review', 'User', 'Predictor', 'Asset', 
    'GlobalData', '$http', 'VoteService', 'facebook', NewsController]);

VOTE_STATUS = {none: 0, upVote: 1, downVote: -1};

function NewsController(News, $rootScope, $scope, news, Review, User, Predictor, Asset, GlobalData, $http, VoteService, facebook) {
    $scope.news = news;
    $scope.reviews = [];
    $scope.input = { review: {} };
    $scope.cache = { predictors: [], assets: [] };
    $scope.localVoteStatuses = {};

    //functions
    $scope.getPrediction = getPrediction;
    $scope.addReview = addReview;
    $scope.upVote = upVote;
    $scope.downVote = downVote;

    active();
    //private helper methods
    function active() {
    	Review.query({newsId: news.id}).$promise
    	.then(function(data) {
    		$scope.reviews = data;

    		//then for each review, get the info about the user, predictor, asset, upvote Status
    		for (var i = $scope.reviews.length - 1; i >= 0; i--) {
    			var review = $scope.reviews[i];

	    		review.user = User.get({ id: review.userID });	
	    		review.predictor = Predictor.get({ id: review.predictorID });	
	    		review.asset = Asset.get({ id: review.assetID });

                var currentUser = GlobalData.getCurrentUser();
                if(currentUser) {
                    VoteService.getVoteStatus(currentUser.id, review.id)
                    .then(function(res) {
                        $scope.localVoteStatuses[res.newsCheckId] = res.status;
                    });
                }
    		};
    	});

    	//query predictors and assets at the same time
    	cacheAllPredictor();
    	cacheAllAsset();

        facebook.parseElements();
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
        var currentUser = GlobalData.getCurrentUser();
        if(!currentUser) {
            alert('You Must Log In to Vote');
            return;
        }

        //if alr upvoted, then devote
        if($scope.localVoteStatuses[review.id] === 1) {
            VoteService.devote(currentUser.id, review.id)
            .then(function(res) {
                $scope.localVoteStatuses[review.id] = VOTE_STATUS.none;
                review.upVote--;
                review.$update();
            });
            return;
        }

        VoteService.vote(currentUser.id, review.id, true)
        .then(function(res) {
            $scope.localVoteStatuses[review.id] = VOTE_STATUS.upVote;

            //set the upvote, down vote count
            var previousVoteState = res.previousVoteState | 0;
            if(previousVoteState === 0) {
                review.upVote++;    
            } else if(previousVoteState === -1) {
                review.downVote--;
                review.upVote++;
            }
            review.$update();
        });
    }

    function downVote(review) {
    	var currentUser = GlobalData.getCurrentUser();
        if(!currentUser) {
            alert('You Must Log In to Vote');
            return;
        }

        //if alr downvote, then devote
        if($scope.localVoteStatuses[review.id] === -1) {
            VoteService.devote(currentUser.id, review.id)
            .then(function(res) {
                $scope.localVoteStatuses[review.id] = VOTE_STATUS.none;
                review.downVote--;
                review.$update();
            });
            return;
        }

        VoteService.vote(currentUser.id, review.id, false)
        .then(function(res) {
            $scope.localVoteStatuses[review.id] = VOTE_STATUS.downVote;

            //set the upvote, down vote count
            var previousVoteState = res.previousVoteState | 0;
            if(previousVoteState === 0) {
                review.downVote++;    
            } else if(previousVoteState === 1) {
                review.downVote++;
                review.upVote--;
            }
            review.$update();
        });
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
    	var review = new Review(input.review);
    	review.newsID = $scope.news.id;
    	review.predictorID = $scope.input.predictor.originalObject.id;
    	review.assetID = $scope.input.asset.originalObject.id;
    	review.userID = GlobalData.getCurrentUser().id;

        //set some default fields
        review.assetNotAvailabe = review.assetNotAvailabe || 0;
        review.upVote = review.upVote || 0;
        review.downVote = review.downVote || 0;
        review.CannotTell = review.CannotTell || 0;

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
    	if(!input.review.CannotTell && !input.review.NoPrediction && !input.review.upDown) {
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