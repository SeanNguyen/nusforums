var app = angular.module('ratingApp');

app.factory('statistic', ['$resource', function($resource) {
  
  // get price by date
  function getPriceByIdAndDate(assetId, date) {
    return $resource('/api/prices', {}, {
      query: {method: 'GET', params: {id: assetId, startDate: date, endDate: date}, isArray: true}
    });
  };

  function getPredictionByPredictor(predictorId) {
    return $resource('/api/checked_news', {}, {
      query: {method: 'GET', params: {predictorID: predictorId}, isArray: true}
    });
  };

  function getAverage(value) {
    var sum = 0;
    for (var i = 0; i < value.length; i++) {
      sum += value[i];
    }

    return sum / value.length;
  };

  function getReturnRate(assetId, startDate, endDate) {
    var startPrice = getPriceByIdAndDate(assetId, startDate);
    var endPrice = getPriceByIdAndDate(assetId, endDate);

    return endPrice.adjClose / startPrice.adjClose -1;
  };

  function getReturnRateByAssetAndPredictor(assetId, predictorId, startDate, endDate) {
    // retrieve assestIds predicted by predictor

  };

  function getReturnRateByPredictor(predictorId, startDate, endDate) {
    var predictions = getPredictionByPredictor(predictorId);
    var assetIds = predictions.map(function(prediction) {
      return prediction.assetID;
    });

  };

  return {
    getReturnRate: getReturnRate,
    getReturnRateByAssetAndPredictor: getReturnRateByAssetAndPredictor,
    getReturnRateByPredictor: getReturnRateByPredictor
  };
}]);