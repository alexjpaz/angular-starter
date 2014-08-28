angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	ResourceProvider.register('VehicleListStatic', '/vehicle/list/static');
	ResourceProvider.register('VehicleComplete', '/vehicle/complete/:vehicleId');
	ResourceProvider.register('VehicleDeviceList', '/vehicle/list/devices');
	ResourceProvider.register('VehicleDeviceListMin', '/vehicle/list/min');
	ResourceProvider.register('VehicleBusinessList', '/vehicle/list/business/:busEntId');
	ResourceProvider.register('VehicleUsers', '/vehicle/:vehicleId/users');
	ResourceProvider.register('VehicleInfo', '/vehicle/:vehicleId');
	
	$provide.factory('VehicleImages', function($resource) {

	});
});
/** @file */
