angular.module('vehimatics/reporting').config(function(ComponentProvider) {

	ComponentProvider.register('reports-lang', {
		componentGroup: 'reporting',
		replace: true,
		controller: function($scope, TranslationHelper) {
			$scope.$watch('language.select', function(lang) {
				if(angular.isUndefined(lang)) return;
				TranslationHelper.setLanguage(lang);
			});
		}
	});

});
/** @file */
