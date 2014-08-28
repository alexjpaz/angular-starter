angular.module('vehimatics/framework').config(function($provide) {
	$provide.provider('TemplateResolver', function() {
		var baseUrl = null;
		
		this.setBaseUrl = function(url) {
			baseUrl =  url;
		};
		
		this.resolve = function(turl) {
			var components = [baseUrl,turl+'.html'];
			return components.join('/');
		};

		this.$get = function() {
			return this;
		};
	});
});
/** @file */
