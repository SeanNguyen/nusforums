'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('topics', {
		url: '/topics',
		templateUrl: 'app/topics/topics.html',
		controller: 'TopicsController'
	});
});