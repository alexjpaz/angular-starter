angular.module('vehimatics').config(function($filterProvider) {
	/**
	 * @function module:vehimatics.filter#num
	 */
	 $filterProvider.register('num', function() {
		 return function(input) {
			 return parseInt(input, 10);
		 }
	 });
});
/** @file */
