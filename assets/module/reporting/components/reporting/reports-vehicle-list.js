angular.module('vehimatics/reporting').config(function(ComponentProvider, $injector) {

	ComponentProvider.register('reports-vehicle-list', {
			componentGroup: 'reporting',
			replace: true,
			scope: {reportsVehicleList:'=',query:'@'},
			controller: function($scope, VehicleDeviceListMin) {
				var deviceParam = {
					query: "HAS_DEVICE"
				}

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
