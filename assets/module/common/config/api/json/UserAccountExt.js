angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.UserAccountExt
	 * @property {long} personId - user identifer
	 * @type module:vehimatics/framework.FormResource
	 */
	 ResourceProvider.register('UserAccountExt', '/account/user/ext/:personId'); 
});
/** @file */
