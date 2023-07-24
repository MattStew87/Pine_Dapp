//
// Apex spark chart
//

'use strict';

var apexCharts = require('apexcharts');
var themeStyles = require('../theme-styles');

function apexSparkChart() {
	this.init = function(chartEl) {
		var styles = new themeStyles();
		function init(chartEl) {
			// Options
			var options = {
				chart: {
					width: '100%',
					sparkline: {
						enabled: true
					}
				},
				series: [],
				labels: [],
				plotOptions: {
					bar: {
						columnWidth: '40%',
						endingShape: 'rounded'
					}
				},
				stroke: {
					curve: "smooth"
				},
				markers: {
					size: 0
				},
				colors: [],
				tooltip: {
					fixed: {
						enabled: false
					},
					x: {
						show: false
					},
					y: {
						title: {
							formatter: function(e) {
								return ""
							}
						}
					},
					marker: {
						show: !1
					}
				}
			}

			// Get data from data attributes
			var dataset = chartEl.dataset.dataset,
				labels = chartEl.dataset.labels,
				color = chartEl.dataset.color,
				height = chartEl.dataset.height,
				type = chartEl.dataset.type,
				stroke = chartEl.dataset.stroke;

			// Inject synamic properties
			options.series = [{
				data: dataset.split(',')
			}];

			if (labels) {
				options.labels = [labels];
			}

			options.colors = [
	        	styles.colors().theme[color]
	        ];
			options.chart.height = height ? height : 35;
			options.chart.type = type ? type : 'line';
			options.stroke.width = stroke ? stroke : 2;

			// Create chart
			setTimeout(function() {
				new apexCharts(chartEl, options).render();
			}, 300);
		}

		if (chartEl) {
			init(chartEl);
		}
	}
}

module.exports = apexSparkChart;
