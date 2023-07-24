//
// Datepicker
// using the Flatpickr plugin
//

'use strict';

import flatpickr from "flatpickr";

module.exports = function datepicker() {
    this.init = function(el) {
		var options = {
			enableTime: false,
			allowInput: true,
			wrap: true,
            dateFormat: 'M d, Y',
            position: 'right'
		};

		flatpickr(el, options);
	}
    this.range = function(el) {
		var options = {
			enableTime: false,
			allowInput: true,
			wrap: true,
            dateFormat: 'M d, Y',
            mode: 'range',
            defaultDate: ["Jan 23, 2022", "Jan 30, 2022"]
            // position: 'right'
		};

		flatpickr(el, options);
	}
}
