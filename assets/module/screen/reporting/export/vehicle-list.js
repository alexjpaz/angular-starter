angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-vehicle-list-report', {
		pageTitle: 'Vehicle List',
		controller: function ($scope, $filter, $location, UserAccount, UserReports, VehicleReportingList, $injector, Collection, Storage, ReportsHelper, $document, $window, $animate) {
			$animate.enabled(false);
			$scope.limitToHack = 10;
			$document.bind('scroll', function() {
				if( $(window).scrollTop() >= ($(document).height() - $(window).height() - 150) ) {
					$scope.limitToHack += 10;
					$scope.$apply();
				}
			});
			$scope.vehicleList = true;
			$scope.reportLoading = false;

			UserSession = $injector.get('UserSession');

			UserReports.get( function(results){
				$scope.reportPermissions = results.availableReports;
				$scope.userReports = {};

				angular.forEach($scope.reportPermissions, function(obj, objIndex) {
					angular.forEach(obj, function(objValue, objProp) {
						if (objProp === "reportType") {
							this[objValue] = true;
						}
					}, $scope.userReports);
				});
			});

			UserAccount.get(function(user){
				$scope.userData = user;
				$scope.userData.support = $scope.userData.supportNumbers[user.languageCode];
			});

			$scope.url = $location.search();

			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'vehicleNickname';
			$scope.sort.reverse = false;
			
			function clear(){
				$scope.report = null;
			}

			$scope.language = {};
			$scope.language.select = "en";

			$scope.getReport = function() {
				
				$scope.reportLoading = true;

				clear();
								
				VehicleReportingList.get(function(results){

					$scope.reportLoading = false;
					$scope.report = results.reportData;
		
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageStartDate', 'packageStartDate');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageExpireDate', 'packageExpireDate');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortMaintSchedLastChecked', 'maintSchedLastChecked');
					
					if ($scope.report.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found. Please make sure your account has vehicles with enabled devices and current subscriptions."};
					}

				});

			}

			$scope.getReport();

			function Column(columnKey, trnKey) {
				this.columnKey = columnKey;
			    this.trnKey = trnKey;	
			}

			var screenStorage = Storage.getInstance('screen-vehicle-list-report');

			var columns = new Collection(Column);
			columns.add('vehicleNickname','"Vehicle"');
			columns.add('vin','"VIN"');
			columns.add('vehicleId','"Vehicle ID"');
			columns.add('hybridYn','"Hybrid?"');
			columns.add('calculatedOdometer','"Calculated Odometer"');
			columns.add('packageDesc','"Package"');
			columns.add('packageStartDate','"Package Start"');
			columns.add('packageExpireDate','"Package Expires"');
			columns.add('packageDaysLeft','"Days Left"');
			columns.add('activationStatusDesc','"Status"');
			columns.add('demoDevice','"Demo?"');
			columns.add('maintSchedOnFileYn','"Maintenance Schedule?"');
			columns.add('maintSchedLastChecked','"Schedule Last Checked"');
			columns.add('vehicleOwnerName','"Owner"');
			columns.add('deviceSerialNo','"Device Serial"');
			columns.add('deviceSoftwareVersion','"Software Version"');
			columns.add('cableRequiredYn','"Cable Required?"');
			columns.add('cableUsedYn','"Cable Used?"');

			$scope.columns = columns.get();
			$scope.hide = {
				vin: true,
				hybridYn: true,
				packageDesc: true,
				packageStartDate: true,
				deviceSerialNo: true,
				cableRequiredYn: true,
				cableUsedYn: true
			}
			angular.extend($scope.hide, screenStorage.get('hide'));
			$scope.toggleColumn = function(k) {
				$scope.hide[k] = !$scope.hide[k];
				screenStorage.put('hide', $scope.hide);
			};
			
		}

	});

});
/** @file */
