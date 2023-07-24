// Bootstrap JS
var bootstrap = require('bootstrap');

// Charts
let apexLineChart = require('./apex-charts/line');
let apexBarChart = require('./apex-charts/bar');
let apexUsersChart = require('./apex-charts/users');
let apexSparkChart = require('./apex-charts/spark');

// Libs
let datepicker = require('./datepicker');

document.addEventListener('DOMContentLoaded', () => {

    // Line chart
    const lineChartEl = document.querySelector("#chart-line");
    if(lineChartEl) {
        new apexLineChart().init(lineChartEl);
    }

    // Bar chart
    const barChartEl = document.querySelector("#chart-bar");
    if(barChartEl) {
        new apexBarChart().init(barChartEl);
    }

    // Users chart
    const usersChartEl = document.querySelector("#chart-users");
    if(usersChartEl) {
        new apexUsersChart().init(usersChartEl);
    }

    // Spark chart
    const sparkChartsEl = document.querySelectorAll("[data-toggle='spark-chart']");
    if(sparkChartsEl) {
        Array.prototype.forEach.call(sparkChartsEl , function(el) {
            new apexSparkChart().init(el);
        })
    }

    // Light Gallery
    const galleryEl = document.querySelector("#lightgallery");
    if(barChartEl) {
        new lightGallery().init(galleryEl);
    }

    // Datepicker
    const dateRangePickerEl = document.querySelector(".daterangepicker");
    if(dateRangePickerEl) {
        new datepicker().range('.daterangepicker');
    }

    const datepickerEl = document.querySelector(".datepicker");
    if(datepickerEl) {
        new datepicker().init('.datepicker');
    }

});
