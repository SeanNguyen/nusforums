'use-strict';
var app = angular.module('ratingApp');

app.controller('TopicsController', ['News', '$rootScope', '$scope', TopicsController]);

function TopicsController(News, $rootScope, $scope) {
    var minVisibleRange = 50;

    $scope.loaded = false;
	$scope.search = {keyword: ''};
    $scope.freshTopics = [];
    $scope.checkedTopics = [];
    $scope.visibleRange = minVisibleRange;

    // functions
    $scope.showMore = showMore;
    $scope.onTabSelect = onTabSelect;
    
    active();

    function active() {
        getNews('', true);
        getNews('', false);
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
            News.query({keyword: keyword, isFresh: isFresh}).$promise
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
            News.query({keyword: keyword, isFresh: isFresh}).$promise
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
}