angular.module('vehimatics').config(function(DirectiveProvider) {

	/**
	 * @directive: v-chosen
	 * @param chosen options
	 *
	 * e.g. 
	 * <ANY v-chosen>
	 *    <select ...>
	 *    </select>
	 * </ANY>
	 * @function module:vehimatics.directive#v-chosen
	 */

	 DirectiveProvider.register('v-chosen', function(jQuery) {
		 return {
			 controller: function($scope, $element, $attrs) {
				 //var $el = $element.find('select');
				 var $el = $element;

				 var chel = jQuery($el).chosen($attrs.vChosen).next('.chosen-container');

				 $scope.$watch(function() {
					 $el.trigger('chosen:updated');
				 });

				 $scope.$on('TranslationHelper.changeLanguage', function(e, lan, isRtl) {
					 chel.addClass('chosen-rtl');
					 if(!isRtl) {
						 chel.removeClass('chosen-rtl');
					 }
				 });
			 },
		 };
	 });
});
/** @file */
