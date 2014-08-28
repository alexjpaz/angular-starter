angular.module('vehimatics/reporting').config(function(ComponentProvider) {

	console.debug('apaz', ComponentProvider);
	ComponentProvider.register('reports-nav', {
		componentGroup: 'reporting',
		replace: true
	});

});
/** @file */
