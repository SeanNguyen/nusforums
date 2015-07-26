'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('news', {
		url: '/news/{id}',
		templateUrl: 'app/news/news.html',
		controller: 'NewsController',
		resolve: { 
			news: ['$stateParams', 'News', function($stateParams, News){
		    	return News.get({ id: $stateParams.id }).$promise
		    	.then(function(news) {
		    		return news;
		    	});
			}]
		}
	});
});