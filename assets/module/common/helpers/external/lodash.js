angular.module('vehimatics').config(function($provide) {
	/**
	 * Injectable lodash object.
	 * @see {@link http://lodash.com/}
	 * @member module:vehimatics.external.lodash
	 */ 
	$provide.factory('lodash', function($log) {
		if(angular.isDefined(window._)) {
			return _;
		} else {
			$log.error('lodash is not present! Some features may not work');
		}

		return null;
	});
});

/** @file */
