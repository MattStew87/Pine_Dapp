//
// Apex line chart
//

'use strict';

var apexCharts = require('apexcharts');
var themeStyles = require('../theme-styles');

function apexLineChart() {
    this.init = function(chartEl) {
		var styles = new themeStyles();

		var colorPalette = [
			styles.colors().theme.primary,
            styles.colors().theme.tertiary,
            styles.colors().theme.secondary,
			styles.colors().theme.warning
		];

		function init($this) {
			var options = {
				chart: {
					zoom: {
				        enabled: false
				    },
				    toolbar: {
				        show: false
				    },
				    shadow: {
				        enabled: false,
				    }
				},
				colors: colorPalette,
				stroke: {
				    width: 4,
				    curve: 'smooth'
				},
				series: [
                    {
    					name: 'Ongoing',
    					type: 'line',
    					data: [30, 50, 70, 90, 80, 70, 90, 120, 100, 120, 140]
    				},
                    {
    					name: 'Finished',
    					type: 'line',
    					data: [50, 70, 30, 20, 10, 10, 40, 100, 90, 100, 120]
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
							fontFamily: '#333',
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
							colors: '#999',
							fontSize: '13px',
							fontFamily: 'inherit',
							cssClass: 'apexcharts-xaxis-label',
						}
					}
				},
				legend: {
					show: false
				},
				grid: {
					borderColor: '#f3f3f3',
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
				}
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

module.exports = apexLineChart;
