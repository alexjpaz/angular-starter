angular.module('vehimatics').config(function(DirectiveProvider) {

	/**
	 * Set the elements class to "active" when the location path 
	 * matches the interpolated value (e.g. a link href)
	 * Shorthand for fontawesome
	 * @function module:vehimatics.directive#nav-active
	 * @arg {string} fa - icon to use (resolves to fa-name). Accepts interpolation for dynamic icons
	 */
	 DirectiveProvider.register('nav-active', function($interpolate, $location, AppConfig) {
		 return {
			 link: function(scope, element, attrs) {
				 var baseHref = document.getElementsByTagName('base')[0].href;
				 var path = null;
				 var activeClass = attrs.hrefNavActive || 'active';
				 var link = null;

				 function update(v) {
					 link = v;
					 check();
				 }

				 function check() {
					 var checkResult = link.href;
					 if(!(/^http/).test(link.href)) {
						 if((/^\//).test(link.href)) {
							 checkResult = window.location.origin + link.href;
						 } else {
							 checkResult = baseHref + link.href;
						 }
					 }

					 path = $location.absUrl();

					 if(link.ignoreQuery == false) {
						 checkResult = checkResult.replace(/\?.*/,'');
						 path = path.replace(/\?.*/,'');
					 }

					 if(path === checkResult) {
						 attrs.$addClass(activeClass);
					 } else {
						 attrs.$removeClass(activeClass);
					 }
				 }

				 scope.$watch(attrs.navActive, update);
				 scope.$on('$locationChangeSuccess', check); 
			 }
		 };
	 });
});
/** @file */
