angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-test-translation', {
		controller: function($scope, TranslationHelper, TranslateLanguages, App, $interval) {
			$scope.App = App;
			$scope.lang = function(lang, isRtl) {
				TranslationHelper.setLanguage(lang, isRtl);
				$scope.langKey = lang;
			};

			TranslateLanguages.query(function(langs) {
				$scope.supportedLanguages = langs;
			});

			var tid = null;

			function tick() {
				$scope.date = new Date();
			}

			var tid = $interval(tick, 1000);

			$scope.$on('$routeChangeSuccess', function() {
				$interval.cancel(tid);			
			});
		}
	});
});
/** @file */
