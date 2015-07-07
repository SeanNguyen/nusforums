'use-strict';
var app = angular.module('ratingApp');

app.controller('leaderBoardController', function($rootScope, $scope) {
  $scope.userList = $rootScope.dataController.getUsers();
  $scope.predictorList = $rootScope.dataController.getPredictors();
  
  // by default, all divs are invisible
  $scope.userVisible = false;
  $scope.predictorVisible = false;

  $scope.showUser = function() {
  	$scope.userVisible = true;
  	$scope.predictorVisible = false;
  };

  $scope.showPredictor = function() {
  	$scope.userVisible = false;
  	$scope.predictorVisible = true;
  };
});