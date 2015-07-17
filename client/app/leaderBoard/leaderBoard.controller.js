'use-strict';
var app = angular.module('ratingApp');

app.controller('leaderBoardController', function($rootScope, $scope) {
  $scope.userList = [];
  $scope.predictorList = [];

  // by default, all divs are invisible
  $scope.userVisible = false;
  $scope.predictorVisible = false;

  $scope.showUser = function() {
  	// refresh the list when button clicked
  	$scope.userList = $rootScope.dataController.getUsers();
  	$scope.userVisible = true;
  	$scope.predictorVisible = false;
  };

  $scope.showPredictor = function() {
  	// refresh the list when button clicked
  	$scope.predictorList = $rootScope.dataController.getPredictors();
  	$scope.userVisible = false;
  	$scope.predictorVisible = true;
  };
});