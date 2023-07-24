//
// Dark Mode Switcher
//

'use strict';

var DarkMode = (function() {

	// Variables

	var $btn = document.getElementById('btnSwitchMode');
	var stylesheet = document.getElementById('stylesheet');

	// Config
	var config = {
		mode: (localStorage.getItem('mode')) ? localStorage.getItem('mode') : null,
	}

	// Methods

	function toggleMode(mode, callback) {
		if(mode) {
			var params = stylesheet.getAttribute("href").split('/');

			var file = params[params.length - 1];
			var newFile;

			if (mode == 'dark') {
				newFile = 'dark.css';
			} else {
				newFile = 'main.css';
			}

			newFile = stylesheet.getAttribute('href').replace(file, newFile);

			stylesheet.setAttribute('href', newFile);

			localStorage.setItem('mode', mode);

			// if(mode == 'dark') {
			// 	$btn.classList.add('text-warning');
			// 	$btn.setAttribute('data-mode', 'light');
			// }
			// else {
			// 	$btn.classList.remove('text-warning');
			// 	$btn.setAttribute('data-mode', 'dark');
			// }
            //
			// var $sidebar = document.getElementById('sidebar');
            //
			// if($sidebar) {
			// 	toggleNavbarColor(mode)
			// }

			if (callback) {
				callback();
			}
		}
	}

	function toggleNavbarColor(mode) {

		var $sidebar = document.getElementById('sidebar');
		var $navbar = document.getElementById('topbar');
		// var $logo = document.getElementById('navbar-logo');

		// var params = $logo.getAttribute("src").split('/');

		// var logoFile = params[params.length - 1];
		// var newLogoFile;

		if(mode == 'dark') {
            $sidebar.classList.remove('navbar-light', 'bg-white')
			$sidebar.classList.add('navbar-dark', 'bg-dark')

			$navbar.classList.remove('navbar-light', 'bg-white')
			$navbar.classList.add('navbar-dark', 'bg-dark')

			newLogoFile = $logo.getAttribute('src').replace(logoFile, 'light.svg')

		}
		else {
			$navbar.classList.remove('navbar-dark', 'bg-dark')
			$navbar.classList.add('navbar-light', 'bg-white')

			// newLogoFile = $logo.getAttribute('src').replace(logoFile, 'dark.svg')
		}

		// $logo.setAttribute('src', newLogoFile)


 	}

	// Events

	// Toggle skin
	if($btn && stylesheet) {


		window.addEventListener('load', function() {
			// document.body.style.opacity = '0';
			toggleMode(config.mode, function() {
				document.body.style.opacity = '1';
			});
		});

		$btn.addEventListener('click', function() {
			var mode = $btn.dataset.mode
			document.body.style.opacity = '0';
			toggleMode(mode, function() {
				document.body.style.opacity = '1';
			});
		});
	}

})();
