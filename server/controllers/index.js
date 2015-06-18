
var controllers = {
	news: require('./NewsController'),
	asset: require('./AssetController'),
	assetprice: require('./AssetPriceController'),
	news_checked: require('./NewsCheckedController'),
	predictor: require('./PredictorController'),
	user: require('./UserController'),
	auth: require('./AuthController')
};

module.exports = controllers;
