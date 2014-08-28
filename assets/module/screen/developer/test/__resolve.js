angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-test-init', {
		controller: function($scope, $routeParams, AppConfig) {
			var page = $routeParams.page;

			if(angular.isUndefined(AppConfig.baseUrl)) {
				$scope.url = null;
			} else {
				$scope.url = AppConfig.baseUrl+'assets/screen/developer/test/'+page+'.html'
			}
		}
	});
});
/** @file */
