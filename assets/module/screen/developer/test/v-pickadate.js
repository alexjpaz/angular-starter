angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-test-v-pickadate', {
		controller: function($scope) {
			$scope.date = {};
		}
	});
});
/** @file */
