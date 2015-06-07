'use strict';
var config = require('../config/environment');
var knex = require('knex') (config.mysql);

var Bookshelf = require('bookshelf')(knex);

var User = Bookshelf.Model.extend({
	tableName: 'user'
});
exports.User = User;

var Article = Bookshelf.Model.extend({
	tableName: 'article',
	hasTimestamps: true
});
exports.Article = Article;

var Asset = Bookshelf.Model.extend({
	tableName: 'asset'
});
exports.Asset = Asset;

var Company = Bookshelf.Model.extend({
	tableName: 'company'
});
exports.Company = Company;

var Price = Bookshelf.Model.extend({
	tableName: 'price'
});
exports.Price = Price;

var Person = Bookshelf.Model.extend({
	tableName: 'person'
});
exports.Person = Person;

exports.Bookshelf = Bookshelf;
