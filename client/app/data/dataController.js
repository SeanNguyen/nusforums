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

	var topics = [new TopicModel("1", "Google finance review"), 
					new TopicModel("2", "Finance review of Apple"),
					new TopicModel("3", "New year finance prediction"), 
					new TopicModel("4", "Topic ABC"), 
					new TopicModel("5", "Example"),
					new TopicModel("6", "Google finance review"), 
					new TopicModel("7", "Finance review of Apple"),
					new TopicModel("8", "New year finance prediction"), 
					new TopicModel("9", "Topic ABC"), 
					new TopicModel("10", "Example")];

	//public methods
	this.getPredictors = function () {
		//TODO: modify this with shadow copy (clone)
		return predictors;
	}

	this.getPredictor = function (index) {
		var model = predictors[index];
		//TODO: modify this with shadow copy (clone)
		return model;
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
}