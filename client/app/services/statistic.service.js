var app = angular.module('ratingApp');

app.factory('statistic', ['$http', '$q', 'News', 'Asset', function($http, $q, News, Asset) {
  
  // get price by date
  function priceByAssetAndDate(priceId, startDate, endDate) {
    return $http.get('/api/prices', {params: {id: priceId, startDate: startDate, endDate: endDate}});
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

  function getAverage(values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
      sum += values[i];
    }

    return sum / values.length;
  };

  function returnRate(priceId, startDate, endDate) {
    return priceByAssetAndDate(priceId, startDate, endDate)
    .then(function(res) {
      var prices = res.data;
      if(prices.length === 0)
        return 0;
      var firstPrice = prices[0].close;
      var lastPrice = prices[prices.length - 1].close;
      return (lastPrice - firstPrice) / firstPrice;
    });
  };

  function returnRateByAssetAndPredictor(assetId, predictorId, duration) {
    //get all the news that have this predictor and this asset
    var priceId;
    var promise = Asset.get({id: assetId}).$promise
    .then(function(asset) {
      priceId = asset.ticker1;
      return News.query({ isFresh: false, assetId: assetId, predictorId: predictorId, keyword: ''}).$promise;
    })
    .then(function(news) {
      //calculate return rate for each news
      var promises = [];
      for (var i = news.length - 1; i >= 0; i--) {  
        var startDate = news[i].date;
        var endDate = moment(startDate).add(duration, 'days').format();
        var promise = returnRate(priceId, startDate, endDate);
        promises.push(promise);
      }

      return $q.all(promises);  
    })
    .then(function(rates) {
      return {assetId: assetId, predictorId: predictorId, duration: duration, returnRate: getAverage(rates)};
    });
    return promise;
  };

  function returnRateByPredictor(predictorId, duration) {
    

    // return predictionByPredictor(predictorId)
    // .then(function(res) {
    //   var predictions = res.data;
      
    //   return predictions.map(function(prediction) {
    //     return returnRate(prediction.assetID, prediction.timeStamp, prediction.timeStamp + duration);
    //   });
    // })
    // .then(function(promises) {

    //   $q.all(promises)
    //   .then(function(res) {

    //   });
    // });

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