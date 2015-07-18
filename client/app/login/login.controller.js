(function(){
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('logInController', ['$scope', '$http', 'UserAuth', '$state', 'GlobalData', logInController]);

	function logInController($scope, $http, UserAuth, $state, GlobalData) {
		$scope.input = {};

		$scope.logIn = logIn;

		function logIn() {
			GlobalData.startAppLoadingState();
			UserAuth.logIn($scope.input.email, $scope.input.password)
			.then(function(data) {
				if(data.success) {
					$state.go('main');
				} else {
					alert("email or password is invalid!");
				}
				GlobalData.stopAppLoadingState();
			})
			.catch(function(err) {
				console.log(err);
				alert("email or password is invalid!");
			});
		}
	}
})();