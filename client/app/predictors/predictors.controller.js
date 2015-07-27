'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorsController', function($rootScope, $scope) {
	$scope.search = {name: '', title: ''};
	$scope.showedPredictors = $rootScope.dataController.getPredictors();

	$scope.onSearch = function(name, title) {
		var predictors = $rootScope.dataController.getPredictors();
		name = name.toLowerCase();
		title = title.toLowerCase();
		$scope.showedPredictors = [];
		for (var i = predictors.length - 1; i >= 0; i--) {
			var predictorName = predictors[i].commonName.toLowerCase();
			var predictorTitle = predictors[i].currentTitle.toLowerCase();
			if(predictorName.includes(name) && predictorTitle.includes(title)) {
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