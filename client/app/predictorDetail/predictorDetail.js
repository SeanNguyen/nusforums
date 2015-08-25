'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('predictorDetail', {
		url: '/predictor/:id',
		templateUrl: 'app/predictorDetail/predictorDetail.html',
		controller: 'PredictorDetailController'
	});
});