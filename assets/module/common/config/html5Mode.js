angular.module('vehimatics').config(function($locationProvider) {
	/**
	 * @namespace module:vehimatics.config.html5Mode
	 * @description Set the mode to html5mode by default
	 * @function
	 * @see (http://stackoverflow.com/questions/18214835/angularjs-how-to-enable-locationprovider-html5mode-with-deeplinking)
	 */
		$locationProvider.html5Mode(true);
});

/** @file */
