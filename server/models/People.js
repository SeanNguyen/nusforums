var mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
	id: String,
	name : {
		first: String,
		last: { type: String, trim: true}
	},
	wikiUrl: {type: String, default: ''},
	linkedinUrl: {type: String, default: ''},
	currentEmployer: String,
	currentJobTitle: String,
	currentJobInfo: String,
	lastUpdated: Date,
});

model.exports = mongoose.model('People', peopleSchema);
