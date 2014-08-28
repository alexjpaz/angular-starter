angular.module('vehimatics/reporting').config(function(ComponentProvider, $injector) {
	ComponentProvider.register('reports-slider', {
			componentGroup: 'reporting',
			replace: true,
			scope: {'reportsSlider':'=','column':'@'},
			controller: function($scope) {
			}
	});

});
/** @file */
