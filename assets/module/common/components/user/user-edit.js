angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#user-edit
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('user-edit', {
			 componentGroup: 'user',
			 controller: function($scope, $http, $location, $routeParams, User) {
				 $scope.u = {};
				 $scope.isNewUser = ($routeParams.userId === 'add');

				 var getParams = {
					 pid: $routeParams.userId
				 };

				 User.detail(getParams, function(u) {
					 $scope.u = u;
				 });

				 $scope.updateUser = function() {
					 User.add($scope.u, function(response) {
						 $scope.responseData = response;
					 });
				 };
			 }
	 });

});
/** @file */
