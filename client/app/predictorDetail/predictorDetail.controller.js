'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorDetailController', ['$scope', '$stateParams', 'Predictor', 'facebook', PredictorDetailController]);

function PredictorDetailController ($scope, $stateParams, Predictor, facebook) {
	$scope.predictor;
	$scope.loaded;

	//start the controller
	active();

	function active() {
		$scope.loaded = false;
		Predictor.get({id: $stateParams.id}).$promise
		.then(function (predictor) {
			$scope.predictor = predictor;
			$scope.loaded = true;
		});

		facebook.parseElements();
	}
}