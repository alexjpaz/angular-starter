angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * @function module:vehimatics.directive#redirect
	 */
	DirectiveProvider.register('redirect', function($location, $window, $routeParams, App) {
		return {
			link: function(scope, element, attrs) {
				scope.r = $routeParams;

				attrs.$observe('redirect',function(href) {
					if(App.config.allowRedirects) {
						console.debug('fuck redir', href)
						var base  = App.config.contextPath;
						$window.location.href = base + href;
					}
				});
			}
		};
	});
});
/** @file */
