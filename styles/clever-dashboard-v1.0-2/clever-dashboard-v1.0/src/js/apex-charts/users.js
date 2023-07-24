//
// Apex bar chart
//

'use strict';

var apexCharts = require('apexcharts');
var themeStyles = require('../theme-styles');

function apexUsersChart() {
	this.init = function(chartEl) {
		var styles = new themeStyles();

		var colorPalette = [
			styles.colors().theme.primary,
			styles.colors().theme.secondary
		];

		function init($this) {
			var options = {
				chart: {
					type: 'line',
					stacked: false,
					zoom: {
						enabled: false
					},
					toolbar: {
						show: false
					},
					shadow: {
						enabled: false,
					},
					offsetX: 0,
					animations: {
						enabled: true,
						easing: 'easeinout',
						speed: 800,
						animateGradually: {
							enabled: true,
							delay: 150
						},
						dynamicAnimation: {
							enabled: true,
							speed: 350
						}
					},
					fontFamily: styles.fonts().base
				},
				colors: colorPalette,
				plotOptions: {
					bar: {
						columnWidth: '22px',
						borderRadius: 5
					}
				},
				stroke: {
					colors: ['transparent'],
					width: 4,
					curve: 'smooth'
				},
				series: [{
						name: 'Registered',
						type: 'bar',
						data: [10, 17, 12, 8, 10, 10, 20, 10, 17, 12, 8, 10]
					},
					{
						name: 'Subscribed',
						type: 'bar',
						data: [20, 10, 14, 20, 10, 14, 15, 20, 10, 14, 20, 10]
					}
				],
				markers: {
					size: 0
				},
				xaxis: {
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					},
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					labels: {
						style: {
							colors: '#999',
							fontSize: '13px',
							cssClass: 'apexcharts-xaxis-label',
						}
					}
				},
				yaxis: {
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					},
					labels: {
						style: {
							colors: ['#999'],
							fontSize: '13px',
							cssClass: 'apexcharts-xaxis-label',
						}
					}
				},
				legend: {
					show: false
				},
				grid: {
					borderColor: '#e3ebf6',
					strokeDashArray: 3,
				},
				dataLabels: {
					enabled: false
				},
				tooltip: {
					shared: true,
					intersect: false,
					y: {
						formatter: function(y) {
							if (typeof y !== "undefined") {
								return y.toFixed(0) + " orders";
							}
							return y;
						}
					}
				},
				responsive: [{
					breakpoint: 1300,
					options: {
            plotOptions: {
    					bar: {
    						columnWidth: '30px',
    						borderRadius: 4
    					}
    				},
					}
				}]
			}


			// Get data from data attributes
			var height = $this.dataset.height;

			// Inject dynamic properties
			options.colors = colorPalette;
			options.chart.height = height ? height : 350;

			// Create chart
			new apexCharts($this, options).render();
		}

		if (chartEl) {
			init(chartEl);
		}
	}
}

module.exports = apexUsersChart;
