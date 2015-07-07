(function(){
	'use-strict';

	var app = angular.module('ratingApp');

	app.factory('UserAuth', ['$http', '$rootScope', userAuth]);

	function userAuth($http, $rootScope) {
		function isLoggedIn() {
			if($rootScope.session.currentUser)
				return true;
			return false;
		}

		function getCurrentUser() {
			if(isLoggedIn()) {
				return $rootScope.session.currentUser;
			}
			return null;
		}

		//return promise
		function logIn(email, password) {
			return $http.post('/api/users/login', { email: email, password: password });
		}

		function logOut() {
			return $http.post('/api/users/logout', { email: email });
		}

		return {
			isLoggedIn: isLoggedIn,
			getCurrentUser: getCurrentUser,
			logIn: logIn,
			logOut: logOut
		}
	}
})();