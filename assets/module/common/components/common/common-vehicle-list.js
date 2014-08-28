angular.module('vehimatics').config(function(ComponentProvider, $injector) {
	/**
	 * @function module:vehimatics.components#common-vehicle-list
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('common-vehicle-list', {
			 componentGroup: 'common',
			 replace: true,
			 scope: {commonVehicleList:'=',query:'@'},
			 controller: function($scope, VehicleDeviceListMin) {

				 var deviceParam = {
					 query: "HAS_DEVICE"
				 };

				 VehicleDeviceListMin.query(deviceParam, function(devices) {
					 $scope.vehicles = devices;

					 if ( $scope.vehicles.length == 1 ) {					
						 $scope.$parent.url.vehicleId = $scope.vehicles[0].vehicleId;	
						 $scope.$parent.getReport();
					 }
				 });
			 }
	 });

});
/** @file */
