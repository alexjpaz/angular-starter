angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-missing-maintenance', {
		pageTitle: "Missing Maintenance Schedules",
		controller: function ($scope, $http, ReportsHelper ) {

			$scope.loading = false;

			$scope.filter = {};
			$scope.sort = {};
			$scope.onDemand = {};
			$scope.sort.by = 'maintSchedLastChecked';
			$scope.sort.reverse = false;

			function clear(){
				$scope.report = null;
			}
	
			$scope.getReport = function() {
				
				clear();
				$scope.loading = true;

				var serviceUrl = '/telematics/rest/reporting/vehicle/list/noMaintSched';

				$http({
					method:'GET',
					url: serviceUrl,
				}).then(function(results) {

					$scope.loading = false;
					$scope.report = results.data;

						ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortDate', 'maintSchedLastChecked');
						ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageStart', 'packageStartDate');
						ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageExpire', 'packageExpireDate');
					
					$scope.totalMissing = results.data.length;

				});

			}

			$scope.getReport();
				
		}

	});

});
/** @file */
