'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorDetailController', ['$scope', '$log', '$stateParams', 'Predictor', 'facebook','statistic', PredictorDetailController]);

function PredictorDetailController ($scope, $log, $stateParams, Predictor, facebook, statistic) {
	$scope.predictor;
	$scope.loaded;
	$scope.returnRate;

	//start the controller
	active();

	function active() {
		$scope.loaded = false;
		Predictor.get({id: $stateParams.id}).$promise
		.then(function(predictor) {
			$scope.predictor = predictor;
			$scope.loaded = true;
		});

		//load return rate info
		$scope.returnRate = {
		  week: statistic.returnRateByPredictor($stateParams.id, 7),
		  month: statistic.returnRateByPredictor($stateParams.id, 30),
		  quater: statistic.returnRateByPredictor($stateParams.id, 90),
		  year: statistic.returnRateByPredictor($stateParams.id, 365)
		};
		
		/*$scope.returnRate = {
			week: 0.081231,
			month: -0.09343534,
			quater: 0.1534543,
			year: 0.3431231
		}*/

		facebook.parseElements();
	};
}