(function() {
  'use strict';

  var app = angular.module('ratingApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'angucomplete',
    'angular-loading-bar',
    'ngMaterial',
    'ngMessages',
    'ngStorage'
  ]);

  app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    // disable the loading spinner of the loading bar
    cfpLoadingBarProvider.includeSpinner = false;
  });

  app.run(['facebook', function(facebook) {
    facebook.init();
  }]);

  app.run(['google', function(google) {
    google.init();
  }])
  
  app.controller('AppController', ['$scope', '$rootScope', 'GlobalData', AppController]);

  function AppController($scope, $rootScope, GlobalData) {
    $rootScope.dataController = new DataController();
    GlobalData.stopAppLoadingState();
  }

})();