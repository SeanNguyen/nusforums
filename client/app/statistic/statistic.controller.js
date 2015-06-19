'use-strict';
var app = angular.module('ratingApp');

app.controller('statisticController', ['$rootScope', '$scope', '$http', statisticController]);

function statisticController($rootScope, $scope, $http) {
	$scope.loaded = false;
	$http.get('/api/prices').
		success(function(data, status, headers, config) {
			data = preprocessData(data);
			render(data);
			$scope.loaded = true;;
		}).
		error(function(data, status, headers, config) {
			console.log("There is an error when query for prices data");
			console.log(data);
			$scope.loaded = true;
		});

	//private helper methods
	function preprocessData(data) {
		var result = [];
		for (var i = data.length - 1; i >= 0; i--) {
			result.push(data[i].close);
		};
		return result;
	}

	function render(data) {
		// Create a timer
	        var start = +new Date();

	        // Create the chart
	        $('#priceGraph').highcharts('StockChart', {
	            chart: {
	                events: {
	                    load: function () {
	                        if (!window.isComparing) {
	                            this.setTitle(null, {
	                                text: 'Built chart in ' + (new Date() - start) + 'ms'
	                            });
	                        }
	                    }
	                },
	                zoomType: 'x'
	            },

	            rangeSelector: {
	                
	                buttons: [{
	                    type: 'day',
	                    count: 3,
	                    text: '3d'
	                }, {
	                    type: 'week',
	                    count: 1,
	                    text: '1w'
	                }, {
	                    type: 'month',
	                    count: 1,
	                    text: '1m'
	                }, {
	                    type: 'month',
	                    count: 6,
	                    text: '6m'
	                }, {
	                    type: 'year',
	                    count: 1,
	                    text: '1y'
	                }, {
	                    type: 'all',
	                    text: 'All'
	                }],
	                selected: 3
	            },

	            yAxis: {
	                title: {
	                    text: 'Price ($)'
	                }
	            },

	            title: {
	                text: 'Finance Asset Price Overtime'
	            },

	            subtitle: {
	                text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
	            },

	            series: [{
	                name: 'Price',
	                data: data,
	                pointStart: Date.UTC(2004, 3, 1),
	                pointInterval: 3600 * 1000,
	                tooltip: {
	                    valueDecimals: 1,
	                    valueSuffix: '$'
	                }
	            }]

	        });
	}
}