(function(){
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('logInController', ['$scope', '$http', 'UserAuth', '$state', 'GlobalData', 'facebook', logInController]);

	function logInController($scope, $http, UserAuth, $state, GlobalData, facebook) {
		$scope.input = {};

		$scope.logIn = logIn;
		$scope.registerByFacebook = registerByFacebook;

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
				GlobalData.stopAppLoadingState();
			});
		}

		function registerByFacebook() {
			//start loading state
			GlobalData.startAppLoadingState();

			facebook.getLoginStatus()
			.then(function(response) {
				if (response.status === 'connected') {
                    loginAfterFacebookLogin(response);
                } else if (response.status === 'not_authorized' || response.status === 'unknown') {
                    facebook.logIn()
                    .then(function(response) {
            			if (response.status === 'connected') {
                    		loginAfterFacebookLogin(response);
                    	}
                    });
                }
			})
			.catch(function (e) {
                console.log(e); // "oh, no!"
                GlobalData.stopAppLoadingState();
            });

            function loginAfterFacebookLogin(response) {
                facebook.updateRootUserByFacebookId(response.authResponse.userID)
                .then(function (localUser) {
                	$state.go('main');
                    GlobalData.stopAppLoadingState();
                })
                .catch(function(err) {
                	alert("There is an error when process your request");
                	GlobalData.stopAppLoadingState();
                });
            }

		}
	}
})();