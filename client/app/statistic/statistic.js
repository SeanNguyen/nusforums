'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('statistic', {
		url: '/statistic?assetId',
		templateUrl: 'app/statistic/statistic.html'
	});
});