angular.module('vehimatics/framework').config(function($provide) {
	$provide.provider('ComponentTemplateResolver', function(TemplateResolverProvider) {
		var baseComponentUrl = null;
		
		this.setBaseComponentUrl = function(baseUrl) {
			baseComponentUrl = baseUrl;
		};
		 
		this.resolve = function(componentName, componentGroup) {
			var components = [baseComponentUrl,componentGroup,componentName+'.html'];
			return components.join('/');
		};

		this.$get = function() {
			return this;
		};
	});
});
/** @file */
