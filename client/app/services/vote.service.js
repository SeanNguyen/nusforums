var app = angular.module('ratingApp');

app.factory('statistic', ['$q', '$resource', 'VoteModel', function ($q, $resource, VoteModel) {

	function isVoted (userId, newsCheckId) {
		var defer = $q.defer();

		VoteModel.query({ userId: userId, newsCheckId: newsCheckId })
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

	function vote (userId, newsCheckId) {
		var defer = $q.defer();

		VoteModel.query({ userId: userId, newsCheckId: newsCheckId })
		.then(function(votes) {
			if(votes.length > 0) {
				defer.resolve();
			} else {
				var vote = VoteModel({ userId: userId, newsCheckId: newsCheckId, timeStamp: moment().format() })
				.save().$promise
				.then(function(votes) {
					defer.resolve();
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

		VoteModel.query({ userId: userId, newsCheckId: newsCheckId })
		.then(function(votes) {
			if(votes.length > 0) {
				var vote = votes[0];
				vote.delete()
				.then(function() {
					defer.resolve();
				}).catch(function(err) {
					defer.reject(err);
				});
			} else {
				defer.resolve();
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
		devote
	};
}]);