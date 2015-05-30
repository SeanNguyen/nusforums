'use-strict';

function TopicModel(id, title, thread, predictorId, assetsId) {
	this.id = id;
	this.title = title;
	this.predictor = predictorId;
	this.asset = assetsId;
	this.thread = thread;
	this.posts = [];
}