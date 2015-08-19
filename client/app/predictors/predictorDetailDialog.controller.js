'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorDetailDialogController', function($scope, $mdDialog, predictor) {
	$scope.predictor = predictor;

	$scope.hide = function() {
	    $mdDialog.hide();
	};
});