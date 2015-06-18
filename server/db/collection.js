'use strict';
var Model = require('../models/index.js');

var Users = Model.Bookshelf.Collection.extend({
  model: Model.User
});
exports.UserCollection = Users;

var News = Model.Bookshelf.Collection.extend({
  model: Model.News
});
exports.NewsCollection = News;

var Assets = Model.Bookshelf.Collection.extend({
  model: Model.Asset
});
exports.AssetCollection = Assets;

var CheckedNews = Model.Bookshelf.Collection.extend({
  model: Model.CheckedNews
});
exports.CheckedNewsCollection = CheckedNews;

var AssetPrices = Model.Bookshelf.Collection.extend({
  model: Model.AssetPrice
});
exports.AssetPriceCollection = AssetPrices;

var Predictors = Model.Bookshelf.Collection.extend({
  model: Model.Predictor
});
exports.PredictorCollection = Predictors;
