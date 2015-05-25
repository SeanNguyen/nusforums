var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
	id: String,
	name: String,
	alias1: String,
	alias2: String,
	wikiUrl: String,
	linkedinUrl: String,
	stockSticker: String,
});

mongoose.model('Company', companySchema);
