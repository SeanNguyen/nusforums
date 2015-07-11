(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('RegisterController', ['$scope', '$http', RegisterController]);

	function RegisterController($scope, $http) {
		$scope.input = {};
	}

})();