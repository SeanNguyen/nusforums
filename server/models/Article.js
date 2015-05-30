var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	id: String,
	headline: String,
	content: String,
	url: String,
	date: { type: Date, default: Date.now },
	source: String,
	author: String,
});

module.exports = mongoose.model('Article', articleSchema);
