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
			console.log(User);
			User.save($scope.input).$promise
			.then(function(user) {
				GlobalData.stopAppLoadingState();

			})
			.catch(function(err) {
				console.log('EER: Cannot login');
				GlobalData.stopAppLoadingState();
			});
		}
	}

})();