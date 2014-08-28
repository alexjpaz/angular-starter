angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-odometer-report', {
		pageTitle: 'Odometer Report',
		controller: function ($scope, $filter, $location, UserAccount, UserReports, VehicleReportingSingle, jQuery, $injector, Collection, Storage, ReportsHelper, $animate) {

			$animate.enabled(false);
			
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

			$scope.reportLoading = false;

			var 
			screenStorage = Storage.getInstance('screen-odometer-report'),
			deviceParam = {
				query: "HAS_DEVICE"
			};
			$scope.last = screenStorage.get('last', {}) || new Object();
			$scope.url = $location.search();

			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'date';
			$scope.sort.reverse = false;
			$scope.url.range = false;
			
			function clear(){
				$scope.report = null;
			}
			
			$scope.language = {};
			$scope.language.select = "en";
			$scope.url.lang = $scope.language.select;

			$scope.getReport = function() {
				
				clear();
				$scope.reportLoading = true;
				$scope.url.reportType = "odometer";
				$location.search($scope.url);
								
				var
				queryParams = $scope.url;

				VehicleReportingSingle.get(queryParams, function(results){

					$scope.reportLoading = false;
					$scope.report = results.reportData;
					$scope.summary = results.totals;
					$scope.header = results.header;
					if ( results.notes ) {
						$scope.notes = results.notes[0];	
					}

					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortDate', 'date');
					

					var
					lastInputGroup = {
						days: $scope.url.days,
						range: $scope.url.range,
					};

					screenStorage.put('last', lastInputGroup);	
					
					if (results.reportData.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID and Reporting Period you entered. Please make sure the vehicle has Trip Logs enabled. If trip logs are enabled, try expanding the Reporting Period."};
					}

				});
				
			}//getReport

			$scope.urLOL = $location.search();
			if ( $scope.urLOL.vehicleId && $scope.urLOL.days || $scope.urLOL.vehicleId && $scope.urLOL.start && $scope.urLOL.end ) {
				$scope.getReport();
			} else {
				$scope.url = screenStorage.get('last', {}) || new Object();
			}
			if (!$scope.urLOL.days && !$scope.last.days) {
				$scope.url.days = "7";
			}

			function Column(columnKey, trnKey) {
				this.columnKey = columnKey;
			    this.trnKey = trnKey;	
			}

			var columns = new Collection(Column);
			columns.add('date','"Date"');
			columns.add('tripsTotal','"Trips"');
			columns.add('tripNumberFirst','"Trip Numbers"');
			columns.add('tripMileage','"Distance"');
			columns.add('tripDurationMinutes','"Trip Length"');
			columns.add('odometer','"Final Odometer"');
			columns.add('hardAccelerationCount','"Hard Accel"');
			columns.add('hardBrakingCount','"Hard Brakes"');
			
			$scope.columns = columns.get();
			$scope.hide = screenStorage.get('hide', {}) || new Object();
			$scope.toggleColumn = function(k) {
				$scope.hide[k] = !$scope.hide[k];
				screenStorage.put('hide', $scope.hide);
			};
				
		}

	});

});
/** @file */
