'use-strict';

var app = angular.module('ratingApp');

app.factory('Asset', ['$resource', function($resource) {
	return $resource('/notes/:id', null,
    {
        'update': { method:'PUT' }
    });
}])