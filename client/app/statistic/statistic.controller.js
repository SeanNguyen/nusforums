'use-strict';
var app = angular.module('ratingApp');

app.controller('statisticController', ['$rootScope', '$scope', '$http', '$stateParams', statisticController]);

function statisticController($rootScope, $scope, $http, $sta) {
	$scope.loaded = false;
	$http.get('/api/prices').
		success(function(data, status, headers, config) {

			data = preprocessData(data);
			console.log(data[0]);
			render(data);
			$scope.loaded = true;
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
			if(data[i].yahooID !== "^GSPC") {
				continue;
			}
			result.push([
				convertDateToMillisecond(data[i].date),
				data[i].open,
				data[i].high, 
				data[i].low,
				data[i].close]);
		};
		return result;
	}

	function render(data) {
		// Create a timer
	    data = [].concat(data, [[Date.UTC(2011, 9, 14, 19, 59), null, null, null, null]]);

	     $('#priceGraph').highcharts('StockChart', {
            chart : {
                type: 'candlestick',
                zoomType: 'x'
            },

            navigator : {
                series : {
                    data : data
                }
            },

            scrollbar: {
                liveRedraw: true
            },

            title: {
                text: 'Asset Cost'
            },

            subtitle: {
                text: '^GSPC Asset Cost Over Time'
            },

            rangeSelector : {
                buttons: [
                {
                    type: 'day',
                    count: 1,
                    text: '1d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false, // it supports only days
                selected : 3 // year
            },

            xAxis : {
                minRange: 3600 * 1000 * 24// one day
            },

            yAxis: {
                floor: 0
            },

            series : [{
                data : data,
                dataGrouping: {
                    enabled: false
                }
            }]
        });
	}

	function convertDateToMillisecond(dateString) {
		var myDate = new Date(dateString);
		var offset = myDate.getTimezoneOffset() * 1000;

		var withOffset = myDate.getTime();
		var withoutOffset = withOffset - offset;
		return withoutOffset;
	}
}