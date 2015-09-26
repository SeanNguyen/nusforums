var app = angular.module('ratingApp');

app.factory('statistic', ['$http', '$q', function($http, $q) {
  
  // get price by date
  function priceByAssetAndDate(assetId, date) {
    return $http.get('/api/prices', {params: {id: assetId, startDate: date, endDate: date}});
  };

  function predictionByPredictor(predictorId) {
  
    return $http.get('/api/checked_news', {params: {predictorID: predictorId}});
  };

  function predictionByPredictorAndAsset(predictorId, assetId) {
    /*return $resource('/api/checked_news', {}, {
      query: {method: 'GET', params: {predictorID: predictorId, assetID: assetId} , isArray: true}
    });*/
    return $http.get('/api/checked_news', {params: {predictorID: predictorId, assetID: assetId}});
  };

  function getAverage(value) {
    var sum = 0;
    for (var i = 0; i < value.length; i++) {
      sum += value[i];
    }

    return sum / value.length;
  };

  function returnRate(assetId, startDate, endDate) {
    var startPrice = priceByAssetAndDate(assetId, startDate);
    var endPrice = priceByAssetAndDate(assetId, endDate);

    return $q.all([startPrice, endPrice])
    .then(function(price) {
      console.log(price);
    });

  };

  function returnRateByAssetAndPredictor(assetId, predictorId, duration) {
    // retrieve assestIds predicted by predictor
    var predictions = predictionByPredictorAndAsset(predictorId, assetId);
    
    var returnRateList = predictions.map(function(prediction) {
      return returnRate(prediction.assetID, prediction.time, prediction.time + duration);
    });

    return getAverage(returnRateList);
  };

  function returnRateByPredictor(predictorId, duration) {
    return predictionByPredictor(predictorId)
    .then(function(res) {
      var predictions = res.data;
      
      return predictions.map(function(prediction) {
        return returnRate(prediction.assetID, prediction.timeStamp, prediction.timeStamp + duration);
      });
    })
    .then(function(promises) {

      $q.all(promises)
      .then(function(res) {

      });
    });

    /*var returnRateList = predictions.map(function(prediction) {
      return returnRate(prediction.assetID, prediction.time, prediction.time + duration);
    });
    
    return getAverage(returnRateList);*/
  };

  return {
    returnRate: returnRate,
    returnRateByAssetAndPredictor: returnRateByAssetAndPredictor,
    returnRateByPredictor: returnRateByPredictor
  };
}]);