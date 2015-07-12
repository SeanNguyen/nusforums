(function() {
	'use strict';

	var app = angular.module('ratingApp');

	app.factory('GlobalData', ['$rootScope', 'User', GlobalData]);

	function GlobalData($rootScope, User) {
		function startAppLoadingState() {
			$rootScope.appState.loaded = false;
		}

		function stopAppLoadingState() {
			$rootScope.appState.loaded = true;
		}

		return {
			startAppLoadingState: startAppLoadingState,
			stopAppLoadingState: stopAppLoadingState
		}
	}

})();