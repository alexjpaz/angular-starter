angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * @function module:vehimatics.directive#v-pickadate
	 * @arg {string} fa - icon to use (resolves to fa-name). Accepts interpolation for dynamic icons
	 */

	 DirectiveProvider.register('v-pickadate', /** @name */ function(jQuery) {
		 return {
			 /** @lends directives */
			 require: 'ngModel',
			 link: function(scope, element, attrs, ngModelCtrl) {
				 var $el = element;

				 var defaults = {
					 format: 'mm-dd-yyyy',
					 dateMax: 365,
					 onSelect: function() {
						 scope.$apply();
					 }
				 };

				 var pd = jQuery($el).pickadate(defaults);
			 }
		 };
	 });
});
/** @file */
