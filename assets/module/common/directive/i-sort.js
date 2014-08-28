angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Shorthand to display sorting icon
	 * @function module:vehimatics.directive#i-sort
	 */

	 DirectiveProvider.register('i-sort', function($interpolate) {
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 var newClasses="", oldClasses="";
				 var context = {};
				 //var faFn = $interpolate('fa fa-{{ value }}'); // Newer version of font-awesome
				 scope.$watch(attrs.iSort, function(value) {
					 oldClasses = newClasses;
					 if(angular.isUndefined(value)) {
						 newClasses = "icon-sort";
					 } else if(value === true) {
						 newClasses = "icon-sort-down";
					 } else {
						 newClasses = "icon-sort-up";
					 }

					 attrs.$updateClass(newClasses, oldClasses);
				 });
			 }
		 };
	 });
});
/** @file */
