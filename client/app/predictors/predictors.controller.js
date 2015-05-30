'use-strict';
var app = angular.module('ratingApp');

app.controller('PredictorsController', function($scope) {
	$scope.search = {keyword: ''};

	// MOCK DATAance");
	var p2 = new PredictorModel("2", "Predictor 2", "Data Scientist");
	$scope.predictors = [new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),];
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist"),
						new PredictorModel("1", "Predictor 1", "World leading in finance"), 
						new PredictorModel("2", "Predictor 2", "Data Scientist")
})