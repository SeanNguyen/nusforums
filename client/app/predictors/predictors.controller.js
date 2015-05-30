'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorsController', function($rootScope, $scope) {
	$scope.search = {keyword: ''};
	$scope.showedPredictors = $rootScope.dataController.getPredictors();

	$scope.onSearch = function() {
		var predictors = $rootScope.dataController.getPredictors();
		$scope.showedPredictors = [];
		for (var i = predictors.length - 1; i >= 0; i--) {
			var predictorName = predictors[i].name.toLowerCase();
			var keyword = $scope.search.keyword.toLowerCase();
			if(predictorName.includes(keyword)) {
				$scope.showedPredictors.push(predictors[i]);
			}
		}
	}

	$scope.removePredictor = function(index) {
		var predictorId = $scope.showedPredictors[index].id;
		$scope.showedPredictors.splice(index, 1);
		$rootScope.dataController.removePredictor(predictorId);
	}
});