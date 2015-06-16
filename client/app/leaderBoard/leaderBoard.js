'use strict';

var app = angular.module('ratingApp');
app.config(function ($stateProvider) {
	$stateProvider.state('leaderBoard', {
		url: '/leaderBoard',
		templateUrl: 'app/leaderBoard/leaderBoard.html',
		controller: 'leaderBoardController'
	});
});