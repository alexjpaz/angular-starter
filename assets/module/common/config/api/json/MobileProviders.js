angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.AccountPersonEmail
	 * @type module:vehimatics/framework.FormResource
	 */
	 ResourceProvider.register('MobileProviders', '/account/mobileproviders');
});
/** @file */
