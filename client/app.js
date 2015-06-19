'use strict';

var app = angular.module('ratingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angucomplete',
  'angular-loading-bar'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    // disable the loading spinner of the loading bar
    cfpLoadingBarProvider.includeSpinner = false;
  });

app.controller('AppController', function($rootScope) {
	$rootScope.dataController = new DataController();
});