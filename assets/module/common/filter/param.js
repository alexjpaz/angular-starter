angular.module('vehimatics').config(function($filterProvider) {
	/**
	 * Generate url encoded string of the argument.
	 * @function module:vehimatics.filter#param
	 * @arg {object} param
	 */
	 $filterProvider.register('param', function(jQuery) {
		 function paramFilter(object, shallow) {
			 var output = '';

			 shallow = angular.isDefined(shallow) && shallow;

			 if(angular.isDefined(object)) {
				 output = jQuery.param(object, shallow);
			 }

			 return output;
		 }

		 return paramFilter;
	 });
});
/** @file */
