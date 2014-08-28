angular.module('vehimatics/reporting').config(function(ComponentProvider) {

	ComponentProvider.register('reports-visibility-menu', {
		componentGroup: 'reporting',
		replace: true,
		scope: {'report':'=reportsVisibilityMenu'},
		controller: function($scope) {
		}
	});

});
/** @file */
