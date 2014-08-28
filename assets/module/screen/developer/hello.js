angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-hello', {
		controller: function($scope, $window) {
			$window.alert('hello');
		}
	});
});
/** @file */
