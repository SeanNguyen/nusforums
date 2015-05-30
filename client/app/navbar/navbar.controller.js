'use strict';

angular.module('ratingApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {'title': 'Home', 'link': '/'},
      {'title': 'Topics', 'link': '/topics'},
      {'title': 'Predictors', 'link': '/predictors'},
      {'title': 'Assets', 'link': '/assets'},
      {'title': 'Forums', 'link': 'http://localhost:4567'}
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });