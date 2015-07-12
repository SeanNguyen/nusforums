(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('RegisterController', ['$scope', '$http', 'User', 'GlobalData', '$state', RegisterController]);

	function RegisterController($scope, $http, User, GlobalData, $state) {
		$scope.input = {};
		$scope.registerForm = { comfirmedPassword: {} };

		//functions
		$scope.login = login;

		//private methods
		function login() {
			GlobalData.startAppLoadingState();
			console.log(User);
			User.save($scope.input).$promise
			.then(function(user) {
				GlobalData.stopAppLoadingState();
				$state.go('login');
			})
			.catch(function(err) {
				console.log('EER: Cannot login');
				GlobalData.stopAppLoadingState();
			});
		}
	}

})();