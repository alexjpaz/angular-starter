/*
* Setup the gettext service.
*/
angular.module('vehimatics/translation').run(function($rootScope, gettextCatalog, $http, $location, Translation, AppConfig, TranslationHelper) {
	var languageKey = AppConfig.languageKey;
	TranslationHelper.setLanguage(languageKey);
});
/** @file */
