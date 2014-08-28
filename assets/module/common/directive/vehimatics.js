angular.module('vehimatics').config(function(DirectiveProvider) {
	DirectiveProvider.register('vehimatics', function($interpolate, $location, jQuery, $compile, $window, AppConfig) {
		return {
			link: function(scope, element) {
				var $title = jQuery('title');
				var $el = $compile('<title>{{ AppConfig.appName }} : {{ AppConfig.pageTitle }}</title>')(scope);
				$title.replaceWith($el);

				$html = element;
				
				scope.$on('TranslationHelper.changeLanguage', function(event, lang, isRtl) {

					$html.attr('lang', lang);
					if(isRtl) {
						$html.attr('dir', 'rtl');
					} else {
						$html.attr('dir', 'ltr');
					}
				});


				$( window ).resize(function(e) {
					if(this.outerWidth < 798) {	
						$(".tabbable").removeClass("tabs-left");
						$(".nav-tabs").addClass("nav-stacked");
					} else {
						$(".tabbable").addClass("tabs-left");
						$(".nav-tabs").removeClass("nav-stacked");
					}
				});


			}
		};
	});
});
/** @file */
