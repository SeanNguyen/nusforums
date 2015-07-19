'use-strict';
var app = angular.module('ratingApp');

app.controller('statisticController', ['$rootScope', '$scope', '$http', '$stateParams', statisticController]);

function statisticController($rootScope, $scope, $http, $stateParams) {
	
    $scope.loaded = true;

	active();

    //private helper methods
    function active() {
        $scope.loaded = false;
        var id = $stateParams.asset.ticker1;
        var endDate = moment.utc().format();
        var startDate = moment.utc('1970-01-01').format();
        var limit = 100;

        queryData(id, startDate, endDate, limit).
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
    }

	function preprocessData(data) {
		var result = [];

        var length = data.length;
		for (var i =  0; i < length; i++) {
			result.push([
				convertDateToMillisecond(data[i].date),
				data[i].open,
				data[i].high, 
				data[i].low,
				data[i].close]);
		};
		return result;
	}

    function queryData(id, startDate, endDate, limit) {
        return $http({
            url: '/api/prices', 
            method: "GET",
            params: { id: id, startDate: startDate, endDate: endDate, limit: limit }
         });
    }

	function render(data) {
        // Add a null value for the end date
        data = [].concat(data, [[Date.UTC(2011, 9, 14, 19, 59), null, null, null, null]]);

        // create the chart
        $('#priceGraph').highcharts('StockChart', {
            chart : {
                type: 'candlestick',
                zoomType: 'x'
            },

            navigator : {
                adaptToUpdatedData: false,
                series : {
                    data : data
                }
            },

            scrollbar: {
                liveRedraw: false
            },

            title: {
                text: $stateParams.asset.displayName
            },

            subtitle: {
                text: $stateParams.asset.displayName
            },

            rangeSelector : {
                buttons: [{
                    type: 'day',
                    count: 7,
                    text: '1w'
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
                selected : 3 // all
            },

            xAxis : {
                events : {
                    afterSetExtremes : afterSetExtremes
                },
                minRange: 24 * 3600 * 1000 // one day
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

    /**
     * Load new data depending on the selected min and max
     */
    function afterSetExtremes(e) {
        var chart = $('#priceGraph').highcharts();

        chart.showLoading('Loading data from server...');
        //load data from server
        var id = $stateParams.asset.ticker1;
        var startDate = e.min;
        var endDate = e.max;
        var limit = 100;

        queryData(id, startDate, endDate, limit)
        .success(function(data, status, headers, config) {
            data = preprocessData(data);
            console.log(data[0]);
            chart.series[0].setData(data);
            chart.hideLoading();
        })
        .error(function(data, status, headers, config) {
            console.log("There is an error when query for prices data");
            console.log(data);
            chart.hideLoading();
        });
    }
}   