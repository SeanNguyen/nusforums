'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('statistic', {
		url: '/statistic',
		templateUrl: 'app/statistic/statistic.html',
		controller: 'statisticController'
	});
});