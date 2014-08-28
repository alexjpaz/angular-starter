angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * For use with block-tabs. If url matches adds and "active" class to highlight.
	 * @function module:vehimatics.directive#href-nav
	 * @arg {string} hrefNav  
	 */
	 DirectiveProvider.register('href-nav', function($interpolate, $location) {
		 return {
			 link: function(scope, element, attrs) {
				 var path = $location.path();
				 var activeClass = attrs.hrefNavActive || 'active';
				 scope.$watch(attrs.hrefNav, function(v) {
					 var fn = $interpolate(v);
					 attrs.$set('href', fn(scope));
				 });

				 attrs.$observe('href', function(v) {
					 v = v.replace('#','');
					 if(path === v) {
						 attrs.$addClass(activeClass);
					 }
				 });
			 }
		 };
	 });
});
/** @file */
