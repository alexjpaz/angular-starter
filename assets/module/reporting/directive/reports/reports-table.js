angular.module('vehimatics/reporting').config(function(DirectiveProvider) {
	DirectiveProvider.register('reports-table', function() {
		return {
			controller: function($scope, $attrs) {
				this.report = $attrs.reportsTable;
			}
		};
	});
});
/** @file */
