angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.ExpiringDemos
	 * @type module:vehimatics/framework.FormResource
	 */
	 ResourceProvider.register('ExpiringDemos', '/package/packages/expiring');
});
/** @file */
