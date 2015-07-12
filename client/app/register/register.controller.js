(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('RegisterController', ['$scope', '$http', 'User', 'GlobalData', RegisterController]);

	function RegisterController($scope, $http, User, GlobalData) {
		$scope.input = {};

		//functions
		$scope.login = login;

		//private methods
		function login() {
			GlobalData.startAppLoadingState();
			User.save(input)
			.then(function() {
				GlobalData.stopAppLoadingState();
				
			})
			.catch(function() {
				console.log('EER: Cannot login');
				GlobalData.stopAppLoadingState();
			});
		}
	}

})();