(function(){
	'use-strict';

	var app = angular.module('ratingApp');

	app.factory('UserAuth', ['$http', '$rootScope', 'GlobalData', '$q', userAuth]);

	function userAuth($http, $rootScope, GlobalData, $q) {

		//return promise
		function logIn(email, password) {
			var deferred = $q.defer();
			$http.post('/api/users/login', { email: email, password: password })
			.then(function(response) {
				GlobalData.setCurrentUser(response.data);
				deferred.resolve({success: true});
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function logInByFacebookId(facebookId) {
			var deferred = $q.defer();
			$http.post('/api/users/login', { facebookId: facebookId })
			.then(function(response) {
				GlobalData.setCurrentUser(response.data);
				deferred.resolve({success: true});
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		function logOut() {
			var currentUser = GlobalData.getCurrentUser();

			var deferred = $q.defer();
			$http.post('/api/users/logout', currentUser)
			.then(function(user) {
				GlobalData.setCurrentUser(null);
				deferred.resolve({success: true});
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		return {
			logIn: logIn,
			logInByFacebookId: logInByFacebookId,
			logOut: logOut
		}
	}
})();