angular.module('vehimatics').config(function(AppConfig, ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.LearnResource
	 */
	 $provide.factory('LearnResource', function($resource) {
		 var base = AppConfig.restUrl;
		 var Get = function(url) {
			 return {
				 method: 'GET',
				 url: base + '/learn' + url
			 };
		 };
		 return $resource('/learn', {}, {
				 help: Get('/help')
		 });
	 });
});
/** @file */
