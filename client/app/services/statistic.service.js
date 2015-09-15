var app = angular.module('ratingApp');

app.factory('statistic', ['$resource', function($resource) {
  
  // get price by date
  function priceByAssetAndDate(assetId, date) {
    return $resource('/api/prices', {}, {
      query: {method: 'GET', params: {id: assetId, startDate: date, endDate: date}, isArray: true}
    });
  };

  function predictionByPredictor(predictorId) {
    return $resource('/api/checked_news', {}, {
      query: {method: 'GET', params: {predictorID: predictorId}, isArray: true}
    });
  };

  function predictionByPredictorAndAsset(predictorId, assetId) {
    return $resource('/api/checked_news', {}, {
      query: {method: 'GET', params: {predictorID: predictorId, assetID: assetId, isArray: true}
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

  function getReturnRateByAssetAndPredictor(assetId, predictorId, duration) {
    // retrieve assestIds predicted by predictor
    var predictions = predictionByPredictorAndAsset(predictorId, assetId);
    
    var returnRateList = predictions.map(function(prediction) {
      return getReturnRate(prediction.assetID, prediction.time, prediction.time + duration);
    });

    return getAverage(returnRateList);
  };

  function getReturnRateByPredictor(predictorId, duration) {
    var predictions = getPredictionByPredictor(predictorId);
    var returnRateList = predictions.map(function(prediction) {
      return getReturnRate(prediction.assetID, prediction.time, prediction.time + duration);
    });
    
    return getAverage(returnRateList);
  };

  return {
    getReturnRate: getReturnRate,
    getReturnRateByAssetAndPredictor: getReturnRateByAssetAndPredictor,
    getReturnRateByPredictor: getReturnRateByPredictor
  };
}]);