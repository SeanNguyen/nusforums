(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('RegisterController', ['$scope', '$http', 'User', 'GlobalData', '$state', 'facebook', RegisterController]);

	function RegisterController($scope, $http, User, GlobalData, $state, facebook) {
		$scope.input = { 
			admin: false
		};
		$scope.registerForm = { comfirmedPassword: {} };

		//functions
		$scope.register = register;
		$scope.registerByFacebook = registerByFacebook;

		//private methods
		function register() {
			GlobalData.startAppLoadingState();
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