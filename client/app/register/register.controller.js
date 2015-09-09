(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('RegisterController', ['$q','$scope', '$http', 'User', 'GlobalData', '$state', 'facebook', 'google', '$log', RegisterController]);

	function RegisterController($q, $scope, $http, User, GlobalData, $state, facebook, google, $log) {
		$scope.input = { 
			admin: false
		};
		$scope.registerForm = { comfirmedPassword: {} };

		//functions
		$scope.register = register;
		$scope.registerByFacebook = registerByFacebook;
		$scope.registerByGoogle = registerByGoogle;

		//public methods
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
		}

		function registerByGoogle() {
		  //start loading state
		  GlobalData.startAppLoadingState();

		  google.getLoginStatus()
		    .then(function(logged_in) {

		      if (logged_in) {
		      	google.getUserProfile()
		      	  .then(function(resp) {
                    logInAfterGoogleLogin(resp.id);
		      	  });
		      } else {
		        $q.all([google.logIn(), google.getUserProfile()])
		          .then(function(data) {
                    var profile = data[1];
                    logInAfterGoogleLogin(profile.id);
		          });
		      }
		    })
		    .catch(function(err) {
		      console.log(err);
		      GlobalData.stopAppLoadingState();
		    });
		};

		//private methods
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

        function logInAfterGoogleLogin(googleId) {
			google.updateRootUserByGoogleId(googleId)
			.then(function (localUser) {
				$state.go('main');
				GlobalData.stopAppLoadingState();
			})
			.catch(function(err) {
				allert("There is an error when process your request");
				GlobalData.stopAppLoadingState();
			});
	    };
	};
})();
