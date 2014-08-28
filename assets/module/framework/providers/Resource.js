angular.module('vehimatics/framework').config(function($provide) {
	/**
	 * @class Resource
	 * @memberof module:vehimatics/framework
	 * @description Registers a service endpoint in the application (e.g. add user)
	 */
	 $provide.provider('Resource', function($provide) {
		 var restUrl = '/telematics/rest';
		 
		 this.setRestUrl = function(inRestUrl) {
			 restUrl = inRestUrl;
		 };
		 
		 this.register = function(resourceName, resourceUrl, resourceExtendObj) {
			 if(resourceUrl.charAt(0) !== '/') {
				 console.log ("resourceURl should begin with a slash"); //TODO: consider including a console.js library so that we can use debug and warn
			 }
			 var concatResourceUrl = restUrl + resourceUrl;

			 var resourceFactoryFn = function($resource) {
				 if(angular.isUndefined(resourceExtendObj)) {
					 return $resource(concatResourceUrl);
				 } else {
					 return $resource(concatResourceUrl, resourceExtendObj.paramDefaults, resourceExtendObj.actions);
				 }
			 }

			 return $provide.factory(resourceName, resourceFactoryFn);
		 };

		 this.$get = function() {
			 return this;
		 }
	 });
});
/** @file */
