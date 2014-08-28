angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#layout-messages
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('layout-messages', {
			 componentGroup: 'layout',
			 replace: true,
			 controller: function($scope, SiteWideMessages) {
				 $scope.messageLimit = 1;
				 $scope.showMessages = true;
				 $scope.closeMessages = function() {
					 $scope.showMessages = false;
				 };
				 $scope.showBody = function(m) {
					 m.$showBody = !m.$showBody;
				 };
				 $scope.messages = [];

				 SiteWideMessages.query(function(messages) {
					 $scope.messages = messages;
				 });
			 }
	 });

});

/** @file */
