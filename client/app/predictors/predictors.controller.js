'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorsController', function($rootScope, $scope, $mdDialog, $state) {
	var minVisibleRange = 25;

	$scope.titles = ['All',
					'Investment Guru', 
					'Investment Guru 2'];
	$scope.search = {name: '', title: 'All'};
	$scope.showedPredictors = $rootScope.dataController.getPredictors();
	$scope.visibleRange = minVisibleRange;

	$scope.onSearch = function(name, title) {
		var predictors = $rootScope.dataController.getPredictors();
		name = name.toLowerCase();
		title = title.toLowerCase();
		$scope.showedPredictors = [];
		for (var i = predictors.length - 1; i >= 0; i--) {
			var predictorName = predictors[i].commonName.toLowerCase();
			var predictorTitle = predictors[i].currentTitle.toLowerCase();
			if(predictorName.includes(name) && (title === 'all' || predictorTitle === title)) {
				$scope.showedPredictors.push(predictors[i]);
			}
		}

		//reset visibleRange
		visibleRange = minVisibleRange;
	}

	$scope.removePredictor = function(index) {
		var predictorId = $scope.showedPredictors[index].id;
		$scope.showedPredictors.splice(index, 1);
		$rootScope.dataController.removePredictor(predictorId);
	}

	$scope.showPredictorDetail = function(event, predictor) {
	    // $mdDialog.show({
	    //   controller: 'PredictorDetailDialogController',
	    //   templateUrl: 'app/predictors/predictorDetailDialog.html',
	    //   parent: angular.element(document.body),
	    //   targetEvent: event,
	    //   clickOutsideToClose:true,
	    //   locals: {
     //    	predictor: predictor
     //    	},
	    // });
	}

	$scope.showMore = function showMore () {
		$scope.visibleRange += minVisibleRange;
	}
});