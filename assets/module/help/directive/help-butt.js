angular.module('vehimatics/help').config(function(DirectiveProvider) {

	DirectiveProvider.register('help-test', function($interpolate, $location, $compile, $filter) {
		return {
			link: function(scope, element, attrs) {
			}
		};
	});
});
/** @file */
