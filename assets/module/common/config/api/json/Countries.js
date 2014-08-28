angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.Countries
	 * @type module:vehimatics/framework.FormResource
	 */
	 ResourceProvider.register('Countries', '/manage/countries');
});
/** @file */
