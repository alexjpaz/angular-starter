angular.module('vehimatics').config(function(DirectiveProvider, AppProvider, ParamEnvironmentProfile) {
	/**
	 * Change the target of the external links to "_self". This should prevent bugs with the back button and history.
	 * @function module:vehimatics.directive#nav
	 */
	 var App = AppProvider.$get();
	 if(App.config.anchorTargetHack) {
		 DirectiveProvider.register('nav', function() {
			 return {
				 restrict: 'C',
				 compile: function(element, attrs) {
					 element.find('a').attr('target','_self');
				 }
			 };
		 });
	 }
});
/** @file */
