'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('assets', {
		url: '/assetsSearch',
		templateUrl: 'app/assets/assets.html',
		controller: 'AssetsController'
	});
});