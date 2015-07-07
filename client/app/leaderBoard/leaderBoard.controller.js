'use-strict';
var app = angular.module('ratingApp');

app.controller('leaderBoardController', function($rootScope, $scope) {
  $scope.userList = $rootScope.dataController.getUsers();
  $scope.predictorList = $rootScope.dataController.getPredictors();
  $scope.isHiden = true;
});