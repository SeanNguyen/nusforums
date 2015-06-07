'use strict';
var Model = require('../models/index.js');

var Users = Model.Bookshelf.Collection.extend({
  model: Model.User
});
exports.UserCollection = Users;

var Articles = Model.Bookshelf.Collection.extend({
  model: Model.Article
});
exports.ArticleCollection = Articles;

var Assets = Model.Bookshelf.Collection.extend({
  model: Model.Asset
});
exports.AssetCollection = Assets;

var Companies = Model.Bookshelf.Collection.extend({
  model: Model.Company
});
exports.CompanyCollection = Companies;

var Prices = Model.Bookshelf.Collection.extend({
  model: Model.Price
});
exports.PriceCollection = Prices;

var People = Model.Bookshelf.Collection.extend({
  model: Model.Person
});
exports.PersonCollection = People;
