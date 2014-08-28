angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-last-alert-report', {
		pageTitle: 'Last Alert Report',
		controller: function ($scope, $filter, $location, UserAccount, UserReports, VehicleReportingList, $injector, Collection, Storage, LastAlert, ReportsHelper, $document, $window, $animate) {
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
			$scope.urLOL = $location.search();
			
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'lastAlertDate';
			$scope.sort.reverse = true;
			
			function clear(){
				$scope.report = null;
			}

			$scope.language = {};
			$scope.language.select = "en";
			$scope.url.lang = $scope.language.select;

			if ( !$scope.urLOL.daysQuiet ) {
				$scope.url.daysQuiet = "3";	
			}
			$scope.shallow = true;

			$scope.getReport = function() {
				
				$scope.reportLoading = true;
				$location.search($scope.url);

				clear();
								
				var
				queryParams = $scope.url;

				LastAlert.get(queryParams, function(results){

					$scope.reportLoading = false;
					$scope.report = results.reportData;
					if ( results.notes ) {
						$scope.notes = results.notes[0];	
					}

					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortLastAlertDate', 'lastAlertDate', 'lastAlertTime');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortLastTripLogRecordDate', 'lastTripLogRecordDate', 'lastTripLogRecordTime');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageStartDate', 'packageStartDate');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortPackageExpireDate', 'packageExpireDate');
					
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

			var screenStorage = Storage.getInstance('screen-last-alert-report');

			var columns = new Collection(Column);
			columns.add('vehicleNickname','"Vehicle"');
			columns.add('vehicleId','"Vehicle ID"');
			columns.add('alertType','"Last Alert"');
			columns.add('lastAlertDate','"Last Alert Date"');
			columns.add('daysSinceLastAlert','"Days Since Last Alert"');
            columns.add('tripLogSchedule','"Trip Log Schedule"');
            columns.add('lastTripLogRecordDate','"Last Trip Log Date"');
            columns.add('daysSinceLastTripLogRecord','"Days Since Last Trip Log"');
            columns.add('vehicleOwnerName','"Owner"');
            columns.add('packageDesc','"Package"');
			columns.add('packageStartDate','"Package Start"');
			columns.add('packageExpireDate','"Package Expires"');
			columns.add('activationStatusDesc','"Status"');
			columns.add('demoDevice','"Demo?"');
			columns.add('vin','"VIN"');
			columns.add('deviceSerialNo','"Device Serial"');
			columns.add('deviceSoftwareVersion','"Software Version"');

			$scope.columns = columns.get();
			$scope.hide = {
				packageStartDate: true,
				tripLogSchedule:true,
				packageDesc: true,
				vin: true,
				deviceSerialNo: true
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
