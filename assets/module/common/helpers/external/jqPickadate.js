angular.module('vehimatics').config(function($provide) {
	/**
	 * Helper for jQuery pickadate
	 * @see {@link http://api.jquery.com/}
	 * @member module:vehimatics.external.jqPickadate
	 */ 

	$provide.service('jqPickadate', function(jQuery) {
		this.bind = function(element, defaults) {
			return jQuery(element).pickadate(defaults);
		};
	});
});

/** @file */
