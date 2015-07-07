(function(){
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('logInController', ['$scope', '$http', 'UserAuth', logInController]);

	function logInController($scope, $http, UserAuth) {
		$scope.input = {};

		$scope.logIn = logIn;

		function logIn() {
			UserAuth.logIn($scope.input.email, $scope.input.password)
			.then(function(data) {
				console.log(data);
			});
		}
	}
})();