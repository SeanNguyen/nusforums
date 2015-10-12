'use-strict';
var app = angular.module('ratingApp');

app.controller('TopicsController', ['News', '$rootScope', '$scope', '$http',  TopicsController]);

function TopicsController(News, $rootScope, $scope, $http) {
    var minVisibleRange = 25;

    $scope.loaded = false;
	$scope.search = {keyword: '', predictorName: '', asset: ''};
    $scope.freshTopics = [];
    $scope.checkedTopics = [];
    $scope.visibleRange = minVisibleRange;
    $scope.cache = { predictors: [], assets: [] };

    // functions
    $scope.showMore = showMore;
    $scope.onTabSelect = onTabSelect;
    
    active();

    function active() {
        getNews('', true);
        getNews('', false);
        cacheAllPredictor();
        cacheAllAsset();
    }

	//public methods
	$scope.onSearch = function(keyword, isFresh) {
        getNews(keyword, isFresh);
        resetVisibleRange();
	}

    function onTabSelect () {
        resetVisibleRange();
    }

    function showMore() {
        $scope.visibleRange += minVisibleRange;
    }

    //private helper methods
    function getNews(keyword, isFresh) {
        if(isFresh) {
            $scope.freshTopics = [];
            $scope.loaded = false;
            News.query({keyword: keyword, isFresh: isFresh, predictor: $scope.search.predictorName, asset: $scope.search.asset}).$promise
            .then(function (data) {
                $scope.freshTopics = data;
                $scope.loaded = true;
            })
            .catch(function (data) {
                alert('Error when loading data');
                $scope.loaded = true;
            });    
        } else {
            $scope.checkedTopics = [];
            $scope.loaded = false;
            News.query({keyword: keyword, isFresh: isFresh, predictor: $scope.search.predictorName, asset: $scope.search.asset}).$promise
            .then(function (data) {
                $scope.checkedTopics = data;
                $scope.loaded = true;
            })
            .catch(function (data) {
                alert('Error when loading data');
                $scope.loaded = true;
            });    

        }
    }

    function resetVisibleRange() {
        $scope.visibleRange = minVisibleRange;
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