var app = angular.module('ratingApp');

app.factory('statistic', ['$q', '$rootScope', '$resource', function ($q, $rootScope, $resource) {
  
  // price and asset class
  var Price = $resource('/api/prices')
  function getReturnRate(assetId, startDate, endDate) {
    var startPrice = $resource('prices/', {}, {
      query: {method: 'GET', params: {id: assetId, startDate: startDate, endDate: startDate}, isArray: true}
    });

    var endPrice = $resource('prices/', {}, {
      query: {method: 'GET', params: {id: assetId, startDate: endDate, endDate: endDate}, isArray: true}
    });

    return endPrice.adjClose/startPrice.adjClose -1;
  };

  function getReturnRateByAssetAndPredictor(assetId, predictorId, startDate, endDate) {
    // retrieve assestIds predicted by predictor

    var assetIds = $resource('')
  };

  function getReturnRateByPredictor(predictorId, startDate, endDate) {

  };

  return {
    getReturnRate: getReturnRate,
    getReturnRateByAssetAndPredictor: getReturnRateByAssetAndPredictor,
    getReturnRateByPredictor: getReturnRateByPredictor
  };
}]);