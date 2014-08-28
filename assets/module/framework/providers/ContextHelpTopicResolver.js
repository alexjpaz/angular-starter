angular.module('vehimatics/framework').config(function($provide) {
	$provide.provider('ContextHelpTopicResolver', function(TemplateResolverProvider) {
		var contextHelpTopicUrl = '/framework_angular/assets/topics';
		
		this.setBaseUrl = function(baseUrl) {
			contextHelpTopicUrl = baseUrl;
		};
		 
		this.resolve = function(topicUrl, languageCode) {
			var components = [contextHelpTopicUrl, topicUrl];
			var url = '';
			url += components.join('/');
			url += '__'+languageCode;
			url += '.html';
			return url;
		};

		this.$get = function() {
			return this;
		};
	});
});
/** @file */
