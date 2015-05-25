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

articleSchema.pre('save', function(next) {
	// get the current date
	var now = new Date();

	// change the updated_at to current
	this.updated_at = now;

	//if create_at not exists, add to that field
	if (!this.created_at) {
		this.created_at = now;
	}
});

module.exports = mongoose.model('Article', articleSchema);
