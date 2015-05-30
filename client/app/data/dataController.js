'use-strict';

function DataController () {
	var predictors = [new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("3", "Predictor 1", "World leading in finance"), 
						new PredictorModel("4", "Predictor 2", "Data Scientist"),
						new PredictorModel("5", "Predictor 1", "World leading in finance"), 
						new PredictorModel("6", "Predictor 2", "Data Scientist"),
						new PredictorModel("7", "Predictor 1", "World leading in finance"), 
						new PredictorModel("8", "Predictor 2", "Data Scientist"),
						new PredictorModel("9", "Predictor 1", "World leading in finance"), 
						new PredictorModel("10", "Predictor 2", "Data Scientist"),
						new PredictorModel("11", "Predictor 1", "World leading in finance"), 
						new PredictorModel("12", "Predictor 2", "Data Scientist"),
						new PredictorModel("13", "Predictor 1", "World leading in finance"), 
						new PredictorModel("14", "Predictor 2", "Data Scientist"),
						new PredictorModel("15", "Predictor 1", "World leading in finance"), 
						new PredictorModel("16", "Predictor 2", "Data Scientist"),
						new PredictorModel("17", "Predictor 1", "World leading in finance"), 
						new PredictorModel("18", "Predictor 2", "Data Scientist"),
						new PredictorModel("19", "Predictor 1", "World leading in finance"), 
						new PredictorModel("20", "Predictor 2", "Data Scientist"),
						new PredictorModel("21", "Predictor 1", "World leading in finance"), 
						new PredictorModel("22", "Predictor 2", "Data Scientist"),
						new PredictorModel("23", "Predictor 1", "World leading in finance"), 
						new PredictorModel("24", "Predictor 2", "Data Scientist"),
						new PredictorModel("25", "Predictor 1", "World leading in finance"), 
						new PredictorModel("26", "Predictor 2", "Data Scientist"),
						new PredictorModel("27", "Predictor 1", "World leading in finance"), 
						new PredictorModel("28", "Predictor 2", "Data Scientist"),
						new PredictorModel("29", "Predictor 1", "World leading in finance"), 
						new PredictorModel("30", "Predictor 2", "Data Scientist")
						];

	var topics = [new TopicModel("1", 
								"Google finance review", 
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem.",
								"2", "1"),

					new TopicModel("2", "Finance review of Apple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."),
					new TopicModel("3", "New year finance prediction", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."), 
					new TopicModel("4", "Topic ABC", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."), 
					new TopicModel("5", "Example", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."),
					new TopicModel("6", "Google finance review", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."), 
					new TopicModel("7", "Finance review of Apple", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."),
					new TopicModel("8", "New year finance prediction", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."), 
					new TopicModel("9", "Topic ABC", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem."), 
					new TopicModel("10", "Example", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus, nisl id consequat tristique, nisl leo maximus elit, a lobortis lorem tortor eget metus. Nulla ac lectus nec nibh blandit efficitur in eget ipsum. Ut facilisis libero mi, a efficitur leo laoreet finibus. Suspendisse dapibus eu ex vel mollis. Nunc sit amet aliquet ex. Nunc quis felis ut erat commodo lacinia eu at magna. Morbi maximus sagittis augue id malesuada. Curabitur vel fermentum orci, eget sodales tortor. Nam egestas ut leo non eleifend. Aenean ac pharetra massa. Integer arcu ex, molestie at lacinia id, blandit non mauris. Maecenas gravida leo id quam facilisis, ac faucibus quam sodales. Sed laoreet viverra dui, pellentesque maximus felis feugiat ut. Donec tortor lacus, sodales et elit eget, tincidunt pulvinar lorem.")];

	var assets = [new AssetModel('1', 'Gas Price', 'The Price of Gas'), 
					new AssetModel('2', 'Oil Price', 'The Price of Oil'), ];

	//public methods
	// PREDICTOR
	this.getPredictors = function () {
		//TODO: modify this with shadow copy (clone)
		return predictors;
	}

	this.getPredictor = function (id) {
		//TODO: modify this with shadow copy (clone)
		for (var i = predictors.length - 1; i >= 0; i--) {
			if(predictors[i].id === id) {
				return predictors[i];
			}
		};
	}

	this.addPredictor = function (model) {
		predictors.push(model);
	}

	this.removePredictor = function (id) {
		for (var i = predictors.length - 1; i >= 0; i--) {
			if(predictors[i].id === id) {
				predictors.splice(i, 1);
				break;
			}
		};
	}

	//TOPIC
	this.getTopics = function () {
		//TODO: modify this with shadow copy (clone)
		return topics;
	}

	this.getTopic = function (index) {
		var model = topics[index];
		//TODO: modify this with shadow copy (clone)
		return model;
	}

	this.addTopic = function (model) {
		topics.push(model);
	}

	this.removeTopic = function (id) {
		for (var i = topics.length - 1; i >= 0; i--) {
			if(topics[i].id === id) {
				topics.splice(i, 1);
				break;
			}
		};
	}

	//ASSET
	this.getAssets = function () {
		//TODO: modify this with shadow copy (clone)
		return assets;
	}

	this.getAsset = function (id) {
		//TODO: modify this with shadow copy (clone)
		for (var i = assets.length - 1; i >= 0; i--) {
			if(assets[i].id === id) {
				return assets[i];
			}
		};
	}

	this.addAsset = function (model) {
		assets.push(model);
	}

	this.removeAsset = function (id) {
		for (var i = assets.length - 1; i >= 0; i--) {
			if(assets[i].id === id) {
				assets.splice(i, 1);
				break;
			}
		};
	}	
}