'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('topics.news', {
		url: '/news/{:id}',
		templateUrl: 'app/topics/news/news.html',
		controller: 'NewsController'
	});
});