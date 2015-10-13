'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorDetailController', ['$scope', '$q', '$stateParams', 'Predictor', 'facebook','statistic', PredictorDetailController]);

function PredictorDetailController ($scope, $q, $stateParams, Predictor, facebook, statistic) {
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

		var promises = [
          statistic.returnRateByPredictor($stateParams.id, 7),
          statistic.returnRateByPredictor($stateParams.id, 30),
          statistic.returnRateByPredictor($stateParams.id, 90),
          statistic.returnRateByPredictor($stateParams.id, 365)
		];

		$q.all(promises)
		.then(function(res) {
		  $scope.returnRate = {
			week: res[0],
			month: res[1],
			quater: res[2],
			year: res[3]
		  };
		});

		//load return rate info
		/*$scope.returnRate = {
		  week: statistic.returnRateByPredictor($stateParams.id, 7),
		  month: statistic.returnRateByPredictor($stateParams.id, 30),
		  quater: statistic.returnRateByPredictor($stateParams.id, 90),
		  year: statistic.returnRateByPredictor($stateParams.id, 365)
		};*/

		/*$scope.returnRate = {
			week: 0.081231,
			month: -0.09343534,
			quater: 0.1534543,
			year: 0.3431231
		}*/

		facebook.parseElements();
	};
}