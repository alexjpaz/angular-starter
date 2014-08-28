angular.module('vehimatics').config(function($provide) {
	/**
	 * Injectable jQuery object. Should only be used as a last resort!
	 * @see {@link http://api.jquery.com/}
	 * @member module:vehimatics.external.jQuery
	 */ 
	$provide.factory('jQuery', function($log) {
		if(angular.isDefined(window.$)) {
			return $;
		} else {
			$log.error('jQuery is not present! Some features may not work');
		}
	});
});

/** @file */
