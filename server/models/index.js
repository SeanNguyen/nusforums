'use strict';
var config = require('../config/environment');
var knex = require('knex') (config.mysql);

var Bookshelf = require('bookshelf')(knex);

var User = Bookshelf.Model.extend({
	tableName: 'users'
});
exports.User = User;

var News = Bookshelf.Model.extend({
	tableName: 'news',
	hasTimestamps: true
});
exports.News = News;

var CheckedNews = Bookshelf.Model.extend({
    tableName: 'news_checked'
});
exports.CheckedNews = CheckedNews;

var Asset = Bookshelf.Model.extend({
	tableName: 'asset'
});
exports.Asset = Asset;

var AssetPrice = Bookshelf.Model.extend({
	tableName: 'assetprice'
});
exports.AssetPrice = AssetPrice;

var Predictor = Bookshelf.Model.extend({
	tableName: 'predictor'
});
exports.Predictor = Predictor;

var Vote = Bookshelf.Model.extend({
	tableName: 'votes'
});
exports.Vote = Vote;


exports.Bookshelf = Bookshelf;
