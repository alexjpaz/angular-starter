angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Shorthand for fontawesome
	 * @function module:vehimatics.directive#fa
	 * @arg {string} fa - icon to use (resolves to fa-name). Accepts interpolation for dynamic icons
	 */
	 DirectiveProvider.register('fa', function($interpolate) {
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 var newClasses="", oldClasses="";
				 var context = {};
				 //var faFn = $interpolate('fa fa-{{ value }}'); // Newer version of font-awesome
				 var faFn = $interpolate('icon-{{ value }}');

				 attrs.$observe('fa', function(value) {
					 oldClasses = newClasses;
					 context.value = value;
					 newClasses = faFn(context);
					 attrs.$updateClass(newClasses, oldClasses);
				 });
			 }
		 };
	 });
});
/** @file */
