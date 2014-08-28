angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.UserAccountList
	 */
	 ResourceProvider.register('UserAccountList', '/account/users'); 
});
/** @file */
