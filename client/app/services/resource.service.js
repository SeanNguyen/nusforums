'use-strict';

var app = angular.module('ratingApp');

app.factory('User', ['$resource', function($resource) {
	return $resource('/api/users/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('News', ['$resource', function($resource) {
	return $resource('/api/news/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Predictor', ['$resource', function($resource) {
	return $resource('/api/predictors/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Review', ['$resource', function($resource) {
    return $resource('/api/checked_news/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('Asset', ['$resource', function($resource) {
    return $resource('/api/assets/:id', null,
    {
        'update': { method:'PUT' }
    });
}]);