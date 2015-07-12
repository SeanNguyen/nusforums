'use-strict';

var app = angular.module('ratingApp');

app.factory('User', ['$resource', function($resource) {
	return $resource('/api/user/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);