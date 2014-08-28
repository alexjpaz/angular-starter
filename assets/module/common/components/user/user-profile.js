angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#user-profile
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('user-profile', {
			 componentGroup: 'user',
			 controller: function($scope, $http, $routeParams, UserAccountExt) {
				 var getParams = {
					 personId: $routeParams.personId
				 };

				 UserAccountExt.get(getParams, function(profile) {
					 $scope.profile = profile
				 }, function() {
					 $scope.error = true;
				 });
			 }
	 });
});
/** @file */
