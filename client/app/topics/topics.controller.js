'use-strict';
var app = angular.module('ratingApp');

app.controller('TopicsController', function($rootScope, $scope) {
	$scope.search = {keyword: ''};
	$scope.showedTopics = $rootScope.dataController.getTopics();

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
});