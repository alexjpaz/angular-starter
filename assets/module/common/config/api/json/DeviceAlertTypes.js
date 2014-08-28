angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.DeviceAlertTypes
	 * @type module:vehimatics/framework.FormResource
	 */
	 ResourceProvider.register('DeviceAlertTypes', '/reporting/alert/types/device'); 
});
/** @file */
