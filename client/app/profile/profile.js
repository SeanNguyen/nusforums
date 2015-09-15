'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('profile', {
		url: '/profile',
		templateUrl: 'app/profile/profile.html',
		controller: 'ProfileController'
	});
});