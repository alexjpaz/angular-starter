angular.module('vehimatics').config(function($provide) {
	$provide.service('TranslationHelper', function(Translation, gettextCatalog, AppConfig, $rootScope) {
		var that = this;
		this.setLanguage = function(lang, isRtlParam) {
			Translation.get({code:lang}, function(data) {
				var translations = data.translations;
				var isRtl = (isRtlParam || data.rtl || that.isLanguageRtl(lang));
				gettextCatalog.currentLanguage = lang;
				gettextCatalog.setStrings(lang, translations);
				AppConfig.languageKey = lang;
				AppConfig.languageRtl = isRtl;
				$rootScope.$broadcast('TranslationHelper.changeLanguage', lang, isRtl);
				//AppConfig.$save();
			});
		};

		this.getLanguage = function () {
			return AppConfig.languageKey;
		};

		this.isLanguageRtl = function(languageKey) {
			var isRtl = false;

			if(languageKey === "ar" || languageKey === "ar_SA") {
				isRtl = true;
			}

			return isRtl;
		};
	});
});
/** @file */
