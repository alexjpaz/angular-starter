angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Disable animation for all child elements
	 * @function module:vehimatics.directive#v-noanimate
	 * @arg {string} fa - icon to use (resolves to fa-name). Accepts interpolation for dynamic icons
	 */

	 DirectiveProvider.register('v-noanimate', function($animate) {
		 return {
			 link: function(scope, element, attrs, ngModelCtrl) {
				 $animate.enabled(false, element);
			 }
		 };
	 });
});
/** @file */
