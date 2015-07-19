'use strict';

angular.module('ratingApp')
  .controller('NavbarCtrl', function ($scope, $location, GlobalData, UserAuth) {
    $scope.menu = [
      {'title': 'Home', 'link': '/'},
      {'title': 'Topics', 'link': '/topics'},
      {'title': 'Predictors', 'link': '/predictors'},
      {'title': 'Assets', 'link': '/assetsSearch'},
      {'title': 'Leader Board', 'link': '/leaderBoard'},
      {'title': 'Forums', 'link': 'http://localhost:4567'},
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isLoggedIn = function() {
      var currentUser = GlobalData.getCurrentUser();
      return !!currentUser
    };

    $scope.logout = function() {
      UserAuth.logOut()
      .then(function() {

      })
      .catch(function(err) {
        alert('There is an error when logging out!');
        console.log(err);
      });
    }
  });