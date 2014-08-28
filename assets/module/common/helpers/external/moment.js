angular.module('vehimatics').config(function($provide) {
	/**
	 * Injectable moment object.
	 * @see {@link http://momentjs.com/}
	 * @member module:vehimatics.external.moment
	 */ 
	$provide.factory('moment', function($log) {
		if(angular.isDefined(window.window)) {
			return window.moment;
		} else {

			$log.error('moment is not present! Some features may not work');
		}
	});
});
/** @file */
