angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#user-list
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('user-list', {
			 componentGroup: 'user',
			 controller: function($scope, UserAccountList) {
				 UserAccountList.query(function(users) {
					 $scope.users = users;
				 });
			 }
	 });

});
/** @file */
