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

  app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, $logProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    // disable the loading spinner of the loading bar
    cfpLoadingBarProvider.includeSpinner = false;

    // enable $log.debug
    $logProvider.debugEnabled(true);
  });

  app.run(['facebook', 'google', function(facebook, google) {
    // load google and facebook SDK async
    facebook.init();
    google.init();
  }]);
  
  app.controller('AppController', ['$scope', '$rootScope', 'GlobalData', AppController]);

  function AppController($scope, $rootScope, GlobalData) {
    $rootScope.dataController = new DataController();
    GlobalData.stopAppLoadingState();
  }

})();