angular.module('vehimatics/reporting').config(function(ComponentProvider) {

	ComponentProvider.register('reports-instructions', {
		componentGroup: 'reporting',
		replace: true,
		scope: {reportsInstructions:'@'},
		transclude: true
	});

});
/** @file */
