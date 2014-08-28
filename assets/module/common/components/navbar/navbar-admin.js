angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#navbar-admin
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('navbar-admin', {
			 componentGroup: 'navbar',
			 controller: function($scope, App, UserAccount) {
				 $scope.App = App;

				 $scope.account = UserAccount.get();
			 }
	 });

});
/** @file */
