angular.module('vehimatics/framework').config(function($provide) {
	/**
	 * Resource
	 *
	 * Registers a service endpoint
	 *
	 * @provider 
	 */

	 $provide.provider('FormResource', function($provide, FormUrlEncodedRequestTransformer, FormUrlEncodedHeaders) {
		 var restUrl = '/telematics/rest';

		 this.setRestUrl = function(inRestUrl) {
			 restUrl = inRestUrl;
		 };

		 this.register = function(resourceName, resourceUrl, resourceExtendObj) {
			 if(resourceUrl.charAt(0) !== '/') {
				 console.log ("resourceURl should begin with a slash");
			 }

			 var concatResourceUrl = restUrl + resourceUrl;

			 var finalExtendObj = {};

			 var defaultExtendObj = {
				 actions: {
					 post: {
						 method: 'POST',
						 headers: FormUrlEncodedHeaders,
						 transformRequest: FormUrlEncodedRequestTransformer
					 },
					 postArray: {
						 method: 'POST',
						 headers: FormUrlEncodedHeaders,
						 transformRequest: FormUrlEncodedRequestTransformer,
						 isArray: true
					 }
				 }
			 };

			 angular.extend(finalExtendObj, defaultExtendObj, resourceExtendObj);

			 var resourceFactoryFn = function($resource) {
				 return $resource(concatResourceUrl, finalExtendObj.paramDefaults, finalExtendObj.actions);
			 };

			 return $provide.factory(resourceName, resourceFactoryFn);
		 };


		 this.$get = function() {
			 return this;
		 };
	 });
});
/** @file */
