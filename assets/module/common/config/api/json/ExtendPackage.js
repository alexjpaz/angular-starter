angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.ExtendPackage
	 * @property {long} deviceId
	 * @type module:vehimatics/framework.FormResource
	 */
	ResourceProvider.register('ExtendPackage', '/device/:deviceId/demoPkgExtend'); 
});
/** @file */
