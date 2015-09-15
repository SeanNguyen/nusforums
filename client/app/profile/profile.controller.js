'use strict';

var app = angular.module('ratingApp');

app.controller('ProfileController', function ($scope, User, GlobalData, $state) {
	$scope.user = {};
	$scope.genders = ['male', 'female', 'other'];

	$scope.update = update;

	active();

	//functions
	function active() {
		var currentUser =  GlobalData.getCurrentUser();
		if(!currentUser) {
			$state.go('main');
			return;
		}
		$scope.user = User.get({id: currentUser.id});
	}

	function update() {
		$scope.user.$update()
		.then(function() {
			alert('Update successfully!');
			GlobalData.setCurrentUser($scope.user);
		})
		.catch(function(err) {
			alert('There is an error when process your request!');
		});
	}

});
