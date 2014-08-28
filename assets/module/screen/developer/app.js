angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-app', {
		controller: function($scope, App) {
			$scope.App = App;

			$scope.$watch('App.config', function(config) {
				localStorage.setItem('App', JSON.stringify(config));
			}, true);

			$scope.setEnv = function(env) {
				App.config.restUrl = 'https://'+env+'.vehimatics.com/telematics/rest'
			};
		}
	});
});
/** @file */
