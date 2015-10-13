var app = angular.module('ratingApp');

app.factory('statistic', ['$http', '$q', 'News', 'Asset', 'Review', function($http, $q, News, Asset, Review) {
  
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

    if (!priceId) {
      var deferred = $q.defer();
      deferred.resolve(0);
      return deferred.promise;
    }

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

    if (assetId <= 0) {
      var deferred = $q.defer();
      deferred.resolve({
        assetId: assetId,
        predictorId: predictorId,
        returnRate: 0
      });

      return deferred.promise;

    } else {

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
  }
  };
  
  /**
   * Get average return rate for all assets of one predictor in all predictions predictions(checked_news)
   */
  function returnRateByPredictor(predictorId, duration) {
    
    // find all predictions in with predictorId
    return Review.query({
      predictorId: predictorId
    }).$promise
    .then(function(check_news) {
      // get all predictions of this particular predictor
      var promises = check_news.map(function(news) {
        var assetId = news.assetID;
        return returnRateByAssetAndPredictor(assetId, predictorId, duration);
      });
      
      return $q.all(promises);
    })
    .then(function(rates) {

      var rates = rates.map(function(rate) {
        return rate.returnRate;
      });
      
      return getAverage(rates);
    });

  };

  return {
    returnRate: returnRate,
    returnRateByAssetAndPredictor: returnRateByAssetAndPredictor,
    returnRateByPredictor: returnRateByPredictor
  };
}]);