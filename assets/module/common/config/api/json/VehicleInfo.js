angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.VehicleInfo
	 * @property {long} vid
	 * @type module:vehimatics/framework.FormResource
	 */
	 ResourceProvider.register('VehicleInfo', '/vehicle/:vid'); 
});
/** @file */
