'use-strict';
var app = angular.module('ratingApp');

app.controller('statisticController', ['$rootScope', '$scope', '$http', '$stateParams', '$q', statisticController]);

function statisticController($rootScope, $scope, $http, $stateParams, $q) {
	
    $scope.loaded = true;
    $scope.error = { nullId: false };

    var canvasHeight = 0;
    var canvasWidth = 0;
    var stage = stage;
    var renderer = renderer;

    var resultLimit = 100;

	active();

    //private helper methods
    function active() {
        //check if there is any price ID for this asset
        if(!$stateParams.asset || !$stateParams.asset.ticker1) {
            $scope.error.nullId = true;
            $scope.loaded = true;
        } else {
            $scope.loaded = false;
            var id = $stateParams.asset.ticker1;

            queryData(id, null, null, resultLimit, $stateParams.asset.id).
            then(function(responses) {
                priceData = responses[0].data;
                predictionData = responses[1].data;
                var processedPriceData = preprocessData(priceData);
                render(processedPriceData);
                //render predictions here
                var startTime = moment(priceData[0].date);
                var endTime = moment(priceData[priceData.length - 1].date);
                initializeCanvas();
                drawPredictions(predictionData, startTime, endTime);
                $scope.loaded = true;
            }).
            catch(function(err) {
                console.log("There is an error when query for prices data");
                console.log(data);
                $scope.loaded = true;
            });
        }
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

    function queryData(priceId, startDate, endDate, limit, assetId) {
        var deferred = $q.defer();

        $q.all([
            $http({ url: '/api/prices', method: "GET", params: { id: priceId, startDate: startDate, endDate: endDate, limit: limit } }),
            $http({ url: '/api/checked_news', method: "GET", params: { assetId: assetId, startDate: startDate, endDate: endDate } }),
        ])
        .then(function(responses) {
            deferred.resolve(responses);
        })
        .catch(function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
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
        var date = moment(dateString);
        var unixDuration = date.unix() * 1000;
		return unixDuration;
	}

    /**
     * Load new data depending on the selected min and max
     */
    function afterSetExtremes(e) {
        var chart = $('#priceGraph').highcharts();

        chart.showLoading('Loading data from server...');
        //load data from server
        var id = $stateParams.asset.ticker1;
        var startDate = moment(e.min);
        var endDate = moment(e.max);

        queryData(id, startDate.format(), endDate.format(), resultLimit, $stateParams.asset.id)
        .then(function(responses) {
            priceData = responses[0].data;
            predictionData = responses[1].data;
            priceData = preprocessData(priceData); 
            chart.series[0].setData(priceData);
            chart.hideLoading();
            drawPredictions(predictionData, startDate, endDate)
        })
        .catch(function(err) {
            console.log("There is an error when query for prices data");
            console.log(data);

            chart.hideLoading();
        });
    }

    function initializeCanvas() {
        var domContainer = $('#predictorContainer');
        canvasHeight = domContainer.height();
        canvasWidth = domContainer.width();
        renderer = PIXI.autoDetectRenderer(canvasWidth, canvasHeight, { antialias: true, transparent: true });
        domContainer.append(renderer.view);

        // create the root of the scene graph
        stage = new PIXI.Container();
        stage.interactive = true;
    }

    function drawPredictions(predictions, startDate, endDate) {
        //clear stage
        for (var i = stage.children.length - 1; i >= 0; i--) {
            stage.removeChild(stage.children[i]);
        };


        //start drawing all the prediction
        for (var i = predictions.length - 1; i >= 0; i--) {
            //cal position
            var predictionDate = moment(predictions[i].timeStamp);
            var totalDuration = moment.duration(endDate.diff(startDate)).asDays();
            var predictionDuration = moment.duration(predictionDate.diff(startDate)).asDays();
            var durationRatio = predictionDuration / totalDuration;
            var absolutePosition = canvasWidth * durationRatio;

            var graphics = new PIXI.Graphics();
            graphics.interactive = true;
            // set a fill and a line style again and draw a rectangle
            graphics.beginFill(0xE91E63, 1);
            graphics.drawRect(absolutePosition, 10, 10, 10);

            graphics.mouseover = function(mouseData){
               console.log(mouseData);
            }

            stage.addChild(graphics);
        };
        

        renderer.render(stage);
    }
}   