angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-vehicle-overview', {
			pageTitle: 'Vehicle Overview',
			controller: function($scope, $routeParams, VehicleComplete, ReportingUbi, $upload, $window) {
				$scope.r = $routeParams;

				$scope.image = [];

				var getParams = {
					vehicleId: $routeParams.vehicleId
				};


				VehicleComplete.get(getParams, function(vehicle) {
					$scope.v = vehicle;

					if(vehicle.deviceInfo != null) {
						var ubiParams = {
							devid: vehicle.deviceInfo.deviceId,
							vid: getParams.vehicleId
						};

						ReportingUbi.get(ubiParams, function(ubi) {
							$scope.ubi = ubi;
						});
					}

				}, function error() {
					$scope.$invalidVehicle = true;
				});

			}
	});
});

/** @file */
