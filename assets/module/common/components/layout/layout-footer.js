angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#layout-footer
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('layout-footer', {
			 componentGroup: 'layout',
			 replace: true,
			 controller: function($scope, Version) {
				 Version.get(function(version) {
					 $scope.version = version;
				 });
			 }
	 });

});
/** @file */
