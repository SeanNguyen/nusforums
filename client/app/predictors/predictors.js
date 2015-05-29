'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('predictors', {
		url: '/predictors',
		templateUrl: 'app/predictors/predictors.html',
		controller: 'PredictorsController'
	});
});