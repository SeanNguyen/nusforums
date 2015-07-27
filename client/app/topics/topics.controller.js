'use-strict';
var app = angular.module('ratingApp');

app.controller('TopicsController', ['News', '$rootScope', '$scope', TopicsController]);


function TopicsController(News, $rootScope, $scope) {
    $scope.loaded = false;
	$scope.search = {keyword: ''};
    $scope.topics = [];
    
    active();

    function active() {
        getNews('', true);
    }

	//public methods
	$scope.onSearch = function(keyword, isFresh) {
        getNews(keyword, isFresh);
	}

    //private helper methods
    function getNews(keyword, isFresh) {
        $scope.topics = [];
        $scope.loaded = false;
        News.query({keyword: keyword, isFresh: isFresh}).$promise
        .then(function (data) {
            $scope.topics = data;
            $scope.loaded = true;
        })
        .catch(function (data) {
            alert('Error when loading data');
            $scope.loaded = true;
        });
    }
}