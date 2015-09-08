(function(){
	'use strict';

	var app = angular.module('ratingApp');

	app.controller('logInController', ['$q','$scope', '$http', 'UserAuth', '$state', 'GlobalData', 'facebook', 'google', logInController]);

	function logInController($q, $scope, $http, UserAuth, $state, GlobalData, facebook, google) {
		$scope.input = {};

		$scope.logIn = logIn;
		$scope.logInByFacebook = logInByFacebook;
		$scope.logInByGoogle = logInByGoogle;

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
				console.log('Error: ', err);
				alert("email or password is invalid!");
				GlobalData.stopAppLoadingState();
			});
		}

		function logInByFacebook() {
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

		function logInByGoogle() {
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
                google.getUserProfile()
		          .then(function(profile) {
                    logInAfterGoogleLogin(profile.id);
		          });
		      }
		    })
		    .catch(function(err) {
		      console.log(err);
		      GlobalData.stopAppLoadingState();
		    });

		    function logInAfterGoogleLogin(googleId) {
              google.updateRootUserByGoogleId(googleId)
                .then(function (localUser) {
                  $state.go('main');
                  GlobalData.stopAppLoadingState();
                })
                .catch(function(err) {
                  alert("There is an error when process your request");
                  GlobalData.stopAppLoadingState();
                });
		    };
		};
	}
})();