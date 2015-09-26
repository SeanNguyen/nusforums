'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorDetailController', ['$scope', '$log', '$stateParams', 'Predictor', 'facebook','statistic', PredictorDetailController]);

function PredictorDetailController ($scope, $log, $stateParams, Predictor, facebook, statistic) {
	$scope.predictor;
	$scope.loaded;
    $scope.statistic;

	//start the controller
	active();

	function active() {
		$scope.loaded = false;
		Predictor.get({id: $stateParams.id}).$promise
		.then(function(predictor) {

			$scope.predictor = predictor;
            fetchStatistic(predictor.id);

			$scope.loaded = true;
		});

		facebook.parseElements();
	};

	function fetchStatistic(predictorId) {
      return statistic.returnRateByPredictor(predictorId, 7);
    };
}