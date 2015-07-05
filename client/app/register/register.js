'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('register', {
		url: '/register',
		templateUrl: 'app/register/register.html',
		controller: 'RegisterController'
	});
});