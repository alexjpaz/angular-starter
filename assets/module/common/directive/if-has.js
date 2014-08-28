angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * @function module:vehimatics.directive#if-has
	 */

	 DirectiveProvider.register('if-has', function($compile, $parse, Permissions) {
		 return {
			 restrict: 'A',
			 priority: 1000,
			 terminal: true,
			 compile: function(element, attrs) {
				 var expr = attrs.ifHas;
				 attrs.$set('ng-if', 'ifHas');
				 element.removeAttr('if-has');
				 return function(scope, iElement, iAttrs, controller) {
					 scope.$watch(function() {
						 if(expr === 'yes') {
							 scope.ifHas = true;
						 } else {
							 scope.ifHas = false;
						 }
					 });
					 $compile(iElement)(scope);
				 };
			 }
		 };
	 });
});
/** @file */
