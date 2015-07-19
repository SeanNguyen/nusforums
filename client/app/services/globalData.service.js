(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.factory('GlobalData', ['$rootScope', 'User', '$localStorage', GlobalData]);

	function GlobalData($rootScope, User, $localStorage) {

	    $rootScope.appState = {};
		$rootScope.session = {};

		function startAppLoadingState() {
			$rootScope.appState.loaded = false;
		}

		function stopAppLoadingState() {
			$rootScope.appState.loaded = true;
		}

		function getCurrentUser() {
			return $localStorage.currentUser;
		}

		function setCurrentUser(user) {
			$localStorage.currentUser = user;
		}

		return {
			startAppLoadingState: startAppLoadingState,
			stopAppLoadingState: stopAppLoadingState,
			getCurrentUser: getCurrentUser,
			setCurrentUser: setCurrentUser
		}
	}

})();