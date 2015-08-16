'use-strict';
var app = angular.module('ratingApp');

app.controller('AssetsController', function($rootScope, $scope, $state) {
	$scope.search = {keyword: ''};
	$scope.showedAssets = $rootScope.dataController.getAssets();

	$scope.onSearch = function() {
		var assets = $rootScope.dataController.getAssets();
		$scope.showedAssets = [];
		for (var i = assets.length - 1; i >= 0; i--) {
			var assetName = assets[i].assetName.toLowerCase();
			var keyword = $scope.search.keyword.toLowerCase();
			if(assetName.includes(keyword)) {
				$scope.showedAssets.push(assets[i]);
			}
		}
	}

	$scope.removeAsset = function(index) {
		var predictorId = $scope.showedAssets[index].id;
		$scope.showedAssets.splice(index, 1);
		$rootScope.dataController.removeAsset(predictorId);
	}

	$scope.showStatistic = function(asset) {
		$state.go('statistic', {assetId: asset.id});
	}
});