// database connection is placed here
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/forumdb', function(err) {
	if (err) {
		console.log('connection error', err);
	} else {
		console.log('connection successful');
	}
});
