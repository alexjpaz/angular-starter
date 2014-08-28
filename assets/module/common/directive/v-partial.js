angular.module('vehimatics').config(function(DirectiveProvider, TemplateResolverProvider) {

	/**
	 * Include partial into template. Resolves partails as "assets/partias/<template/url>.html"
	 * @function module:vehimatics.directive#fa
	 */

	 DirectiveProvider.register('v-partial', function($compile, $http) {
		 return {
			 templateUrl: function(el, attrs) {
				 return TemplateResolverProvider.resolve('partials/'+attrs.vPartial);
			 }
		 };
	 });
});
/** @file */
