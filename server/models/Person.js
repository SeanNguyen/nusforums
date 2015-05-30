var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
  id: String,
  firstName: { type: String, trim: true},
  lastName: { type: String, trim: true},
  wikiUrl: {type: String, default: ''},
  linkedinUrl: {type: String, default: ''},
  currentEmployer: String,
  currentJobTitle: String,
  currentJobInfo: String,
  lastUpdated: Date,
});

module.exports = mongoose.model('Person', personSchema);
