var mongoose = require('mongoose');

var assetPriceSchema = new mongoose.Schema({
	assetId: String,
	flag_stock: String,
	flag_bond: String,
	flag_index: String,
	flag_currency: String,
	flag_commidites: String,
	startDate: Date,
	endDate: Date,
	price: Number,
});

module.exports = mongoose.model('AssetPrice', assetPriceSchema);
