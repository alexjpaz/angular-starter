angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-admin-support-alert-receipt', {
		controller: function($scope, $element, $http, VehicleInfo, DeviceAlertTypes, TroubleshootDiagnoseAlert) {
			$scope.showInstructions = false;

			$scope.toggleInstructions = function() {
				$scope.showInstructions = !$scope.showInstructions;
			};

			// Form parameters. These will be converted to query string params
			$scope.f = {};

			// Path parameter. These will be appeneded to the resource url
			$scope.path = {};

			$scope.submit = function() {
				// Dem API calls
				// This should be wrapped up in an 	
				// resource object rather than the controller

				$scope.vehicleInfo = null;
				$scope.response = null;

				var serviceUrl = base+'/troubleshoot/diagnose'

					var scenarioInt = +$scope.scenario;
				switch(scenarioInt) {
					case 1:
					case 2:
						serviceUrl += '/alerts/'+$scope.path.vid;
						$scope.isSearchingForVehicleInfo = true;
						VehicleInfo.get($scope.path, function(vehicleInfo) {
							$scope.vehicleInfo = vehicleInfo;
						});
						break;
					case 3:
						serviceUrl += '/alerts/0';
						break;
					case 4:
						serviceUrl += '/alert/'+$scope.path.deviceEventId;
						break;

					default:
						break;
				}

				console.debug($scope.f);

				$http({
					method: 'GET',
					url: serviceUrl,
					params: $scope.f // Automatically maps object to query params
				}).then(function(response) {
					console.debug(response.data);
					$scope.response = response.data;
				}, function(error) {
					console.debug(error.data);
					$scope.response = error.data;
				});
				// all null and invalid inputs are automatically "thrown out"
			};

			// TODO: convert to resource
			DeviceAlertTypes.query(function(alertTypes) {
				$scope.alertTypes = alertTypes;
			});
			//fwef
			/////34233423442
		}
	});
});
/** @file */
