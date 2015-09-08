'use-strict';

var app = angular.module('ratingApp');

app.factory('User', ['$resource', function($resource) {
	return $resource('/api/users/:id', { id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('News', ['$resource', function($resource) {
	return $resource('/api/news/:id', { id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Predictor', ['$resource', function($resource) {
	return $resource('/api/predictors/:id', { id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Review', ['$resource', function($resource) {
    return $resource('/api/checked_news/:id', { id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Asset', ['$resource', function($resource) {
    return $resource('/api/assets/:id', { id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('VoteModel', ['$resource', function($resource) {
    return $resource('/api/votes/:id', { id: '@id'},
    {
        'update': { method:'PUT' }
    });
}]);
