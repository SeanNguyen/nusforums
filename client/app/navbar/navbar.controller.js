'use strict';

angular.module('ratingApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {'title': 'Home', 'link': '/'},
      {'title': 'Predictors', 'link': '/predictors'},
      {'title': 'Assets', 'link': '/assets'},
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });