var app = angular.module('ratingApp');

app.factory('statistic', ['$q', '$rootScope', '$resource', function ($q, $rootScope, $resource) {
  
  function getReturnRate(assetId, startDate, endDate) {
    var startPrice = $resource('prices/', {}, {
      query: {method: 'GET', params: {id: assetId, date: startDate}, isArray: true}
    });

    var endPrice = $resource('prices/', {}, {
      query: {method: 'GET', params: {id: assetId, date: endDate}, isArray: true}
    });

    return endPrice/startPrice -1;
  };

  function getReturnRateByAssetAndPredictor(assetId, predictorId, startDate, endDate) {

  };

  function getReturnRateByPredictor(predictorId, startDate, endDate) {

  };

  return {
    getReturnRate: getReturnRate,
    getReturnRateByAssetAndPredictor: getReturnRateByAssetAndPredictor,
    getReturnRateByPredictor: getReturnRateByPredictor
  };
}]);