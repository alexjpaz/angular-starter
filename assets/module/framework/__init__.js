/**
 * Helper config block
 * 
 * This should be put in "assets/helpers/**.js
 *
 * This is where a lot of the applications abstraction happend.
 * A lot of the framework should be defined here and very little
 * should be changed once that has been established.
 */
angular.module('vehimatics').config(function($provide, $compileProvider, AppProvider) {

	$provide.factory('moment', function($log) {
		if(angular.isDefined(window.window)) {
			return window.moment;
		} else {

			$log.error('moment is not present! Some features may not work');
		}
	});

	$provide.service('jqPickadate', function(jQuery) {
		this.bind = function(element, defaults) {
			return jQuery(element).pickadate(defaults);
		};
	});
	



})

/** @file */
