'use-strict';

function PostModel(id, asset, predictor, prediction) {
	this.id = id;
	this.asset = asset;
	this.predictor = predictor;
	this.prediction = prediction;
	this.comments = [];
	this.author;
}