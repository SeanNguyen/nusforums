(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('AppController', ['$scope', '$rootScope', AppController]);

	function AppController($scope, $rootScope) {
		$rootScope.appState = {};

		//functions
		$scope.active = active;

		//private methods
		function active() {
			U$rootScope.appState.loaded = true;
		}
	}

})();