angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * Email for a user account
	 * @class module:vehimatics.api.json.AccountPersonEmail
	 * @property {long} userId - user identifer
	 * @type module:vehimatics/framework.FormResource
	 **/
	ResourceProvider.register('AccountPersonEmail', '/account/person/email/:userId');
});
/** @file */
