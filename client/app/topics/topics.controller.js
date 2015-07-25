'use-strict';
var app = angular.module('ratingApp');

app.controller('TopicsController', ['News', '$rootScope', '$scope', TopicsController]);


function TopicsController(News, $rootScope, $scope) {
    $scope.loaded = false;
	$scope.search = {keyword: ''};
    $scope.topics = [];
    
    active();

    function active() {
        getNews('');
    }

	//public methods
	$scope.onSearch = function(keyword) {
        getNews(keyword);
	}

    //private helper methods
    function getNews(keyword) {
        $scope.topics = [];
        $scope.loaded = false;
        News.query({keyword: keyword}).$promise
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