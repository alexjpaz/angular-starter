angular.module('vehimatics/translation').config(function(DirectiveProvider) {
	/**
	 * Translates and bind property to template elment
	 * Shorthand for fontawesome
	 * @function module:vehimatics.directive#bind-tr
	 * @arg {string} bind-tr - value to translate
	 * @fires TranslationHelper_changeLanguage
	 */
	 DirectiveProvider.register('bind-tr', function($interpolate, $location, $compile, $filter) {
		 return {
			 link: function(scope, element, attrs) {
				 var text = null;
				 function update() {
					 element.text(text == undefined ? '' : $filter('trn')(text));
				 }
				 attrs.$observe('bindTr', function(value) {
					 text = value;
					 update();
				 });

				 scope.$on('TranslationHelper.changeLanguage', update);
			 }
		 };
	 });
});
/** @file */
