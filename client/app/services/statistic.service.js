var app = angular.module('ratingApp');

app.factory('statistic', ['$q', '$rootScope', '$resource', function ($q, $rootScope, $resource) {
  
  function getReturnRate(startDate, endDate, assetId) {
    var startPrice = $resource('prices/', {}, {
      query: {method: 'GET', params: {id: assetId, date: startDate}, isArray: true}
    });

    var endPrice = $resource('prices/', {}, {
      query: {method: 'GET', params: {id: assetId, date: endDate}, isArray: true}
    });

    return endPrice/startPrice -1;
  };

  return {
    getReturnRate: getReturnRate
  };
}]);