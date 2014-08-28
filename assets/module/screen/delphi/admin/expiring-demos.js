angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-expiring-demo-devices', {
		pageTitle: "Expiring Demo Device Report",
		controller: function ($scope, $filter, $http, $location, ExtendPackage, ExpiringDemos, ReportsHelper) {

			$scope.loading = false;

			$scope.url = $location.search();
			$scope.urLOL = $location.search();
			$scope.url.demoDeviceReport = true;
			$scope.url.getExpired = true;

			if (!$scope.urLOL.highDays) {
				$scope.url.highDays = "30";
			}

			if (!$scope.urLOL.lowDays) {
				$scope.url.lowDays = "1";
			}

			$scope.$watch('url.getExpired', function() {
			
				if ($scope.url.getExpired) {
					$scope.url.lowDays = "0";
				}
				if (!$scope.url.getExpired) {
					$scope.url.lowDays = "1";
				}		
			});

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'daysLeft';
			$scope.sort.reverse = false;

			function clear(){
				$scope.report = null;
			}


			
			$scope.getReport = function() {
				
				clear();
				$scope.loading = true;

				packageParams = $scope.url;

				ExpiringDemos.query(packageParams, function(results){

					$scope.loading = false;
					$scope.report = results;

					$location.search($scope.url);

					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageStartDate', 'packageStartDate');			
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageEndDate', 'packageEndDate');

					if (results.length < 1) {
						$scope.report = {noResults: "Sorry no results were found for the specified period"};
					}

					$scope.totalDevices = $scope.report.length;

				});

			}

			$scope.getReport();

			$scope.extendThisDemo = function(device) {
				
				var deviceParam = {deviceId: device.deviceId};

				device.showExpanded = true;

				if ( !device.extended ) {

					ExtendPackage.query(deviceParam, function(results){
						device.extended = results;
						device.success = {};

						angular.forEach(device.extended, function(obj, objIndex){				
							angular.forEach(obj, function(objValue, objProp){
								
								if (objProp === "actionStatus" && obj.recordType === "TELEMATICS_PACKAGE" && objValue === "SUCCESS") {
									this.packageExtended = true;
								}

								if (objProp === "actionStatus" && obj.recordType === "DEVICE" && objValue === "SUCCESS") {
									this.deviceExtended = true;
								}

							}, device.success);
						});//end outer forEach

						/*function isInArray(value, array) {
							return array.indexOf(value)	> -1;
						}*/

						/*if ( isInArray("FAIL", device.success) ) {
							device.extendStatus = "FAIL";
						} else {
							device.extendStatus = "SUCCESS"
						}*/

						if (device.success.packageExtended) {
							device.extendStatus = "SUCCESS";
						} else {
							device.extendStatus = "FAIL";
						}
						
					});//end service call

				}//end if device.extended
			}
				
		}

	});

});
/** @file */
