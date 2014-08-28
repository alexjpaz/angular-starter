angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-born-to-ota', {
		pageTitle: "Time From Born to OTA Complete",
		controller: function ($scope, $http, ReportsHelper ) {

			$scope.loading = false;
			$scope.filter = {};
			$scope.sort = {};
			$scope.onDemand = {};
			
			function clear(){
				$scope.report = null;
			}
	
			$scope.getReport = function() {
				
				clear();
				$scope.loading = true;

				var serviceUrl = '/telematics/rest/reporting/bornToOta';

				$http({
					method:'GET',
					url: serviceUrl,
				}).then(function(results) {

					$scope.loading = false;
					$scope.report = results.data.reportData;

					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YYYY', '$sortLastAlertDate', 'lastAlertDateString');
					//ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YYYY hh:mmA', '$otaSort', 'lastOtaDateString', 'lastOtaTimeString');
					
					$scope.sort.by = 'lastBornAlert';
					$scope.sort.reverse = true;
					$scope.totalDevices = results.data.reportData.length;

					if (results.data.reportData.length < 1) {
						$scope.report = {noResults: "No devices found."};
					}

				});

			}

			$scope.getReport();
				
		}

	});

});
/** @file */
