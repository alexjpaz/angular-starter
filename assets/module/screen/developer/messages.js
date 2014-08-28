angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-messages', {
			controller: function($scope, SiteWideMessages) {
				SiteWideMessages.query(function(messages) {
					$scope.messages = messages;
				});

			}
	});
})
/** @file */
