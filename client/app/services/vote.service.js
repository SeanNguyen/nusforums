var app = angular.module('ratingApp');

app.factory('VoteService', ['$q', '$resource', 'VoteModel', function ($q, $resource, VoteModel) {

	function isVoted (userId, newsCheckId) {
		var defer = $q.defer();

		VoteModel.query({ userId: userId, newsCheckId: newsCheckId }).$promise
		.then(function(votes) {
			if(votes.length > 0) {
				defer.resolve(false);
			} else {
				defer.resolve(true);
			}
		})
		.catch(function(err) {
			defer.reject(err);
		});

		return defer.promise;
	}

	//0 : not voted, 1: up vote, -1: down vote
	function getVoteStatus (userId, newsCheckId) {
		var defer = $q.defer();

		VoteModel.query({ userId: userId, newsCheckId: newsCheckId }).$promise
		.then(function(votes) {
			if(votes.length > 0) {
				var vote = votes[0];
				if(vote.isUpVote == true) {
					defer.resolve({ status: 1, newsCheckId: newsCheckId, userId: userId });	
				} else {
					defer.resolve({ status: -1, newsCheckId: newsCheckId, userId: userId });	
				}
			} else {
				defer.resolve({ status: 0, newsCheckId: newsCheckId, userId: userId });	
			}
		})
		.catch(function(err) {
			defer.reject(err);
		});

		return defer.promise;
	}

	function vote (userId, newsCheckId, isUpVote) {
		var defer = $q.defer();

		VoteModel.query({ userId: userId, newsCheckId: newsCheckId }).$promise
		.then(function(votes) {
			if(votes.length > 0) {
				var vote = votes[0];
				var previousVoteState = 1;
				if(vote.isUpVote == false) {
					previousVoteState = -1;
				}
				if(vote.isUpVote == isUpVote) {
					defer.resolve({ previousVoteState: previousVoteState });
				} else {
					vote.isUpVote = isUpVote;
					vote.$update()
					.then(function(votes) {
						defer.resolve({ previousVoteState: previousVoteState });
					})
					.catch(function(err) {
						defer.reject(err);
					});
				}
			} else {
				var vote = new VoteModel(
					{ 
						userId: userId, 
						newsCheckId: newsCheckId,
						isUpVote: isUpVote
					})
				.$save()
				.then(function(votes) {
					defer.resolve({ previousVoteState: 0 });
				})
				.catch(function(err) {
					defer.reject(err);
				});
			}
		})
		.catch(function(err) {
			defer.reject(err);
		});

		return defer.promise;
	}

	function devote (userId, newsCheckId) {
		var defer = $q.defer();

		VoteModel.query({ userId: userId, newsCheckId: newsCheckId }).$promise
		.then(function(votes) {
			if(votes.length > 0) {
				var vote = votes[0];
				var previousVoteState = 1;
				if(vote.isUpVote == false) {
					previousVoteState = -1;
				}
				var vote = votes[0];
				vote.$delete()
				.then(function() {
					defer.resolve({previousVoteState: previousVoteState});
				}).catch(function(err) {
					defer.reject(err);
				});
			} else {
				defer.resolve({ previousVoteState: 0 });
			}
		})
		.catch(function(err) {
			defer.reject(err);
		});

		return defer.promise;
	}

	return {
		isVoted: isVoted,
		vote: vote,
		devote: devote,
		getVoteStatus: getVoteStatus
	};
}]);