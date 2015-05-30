'use-strict';

function TopicModel(id, title, thread) {
	this.id = id;
	this.title = title;
	this.assets;
	this.thread = thread;
	this.posts = [];
}