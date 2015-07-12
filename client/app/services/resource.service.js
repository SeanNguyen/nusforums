'use-strict';

var app = angular.module('ratingApp');

app.factory('User', ['$resource', function($resource) {
	return $resource('/api/users/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);