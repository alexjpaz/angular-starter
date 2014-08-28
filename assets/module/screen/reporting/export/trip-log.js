angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-trip-log-exporter', {
		pageTitle: 'Trip Log Report',
		controller: function ($scope, $filter, $location, UserAccount, UserReports, VehicleReportingSingle, $injector, Collection, Storage, ReportsHelper, $animate, $timeout) {

			$animate.enabled(false);
			UserSession = $injector.get('UserSession');

			$scope.reportLoading = false;

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
			
			var 
			screenStorage = Storage.getInstance('screen-trip-log-exporter'),
			deviceParam = {
				query: "HAS_DEVICE"
			};
			$scope.last = screenStorage.get('last', {}) || new Object();
			$scope.url = $location.search();
			
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.filter = {
				idle: {}
			};
			$scope.sort = {};
			$scope.sort.by = 'tripNumber';
			$scope.sort.reverse = true;
			
			$scope.today = $filter('date')(new Date(), 'MM-dd-yyyy');
			
				var 
				monthPrior = new Date();
				monthPrior.setDate(monthPrior.getDate()-30);
			
			$scope.monthPrior = $filter('date')(monthPrior, 'MM-dd-yyyy');
			
			function clear(){
				$scope.report = null;
			}

			$scope.language = {};
			$scope.language.select = "en";
			$scope.url.lang = $scope.language.select;

			$scope.getReport = function() {
				

				$scope.reportLoading = true;

				if(!$scope.url.range || $scope.url.range === false || $scope.url.range === undefined) {
					delete $scope.url.start;
					delete $scope.url.end;
				}
				if($scope.url.range === true) {
					delete $scope.url.days;
				}
				$scope.url.reportType = "triplog";
				$location.search($scope.url);

				clear();
				
				

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
					

					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortStartDate', 'startDate', 'startTime');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortStopDate', 'stopDate', 'stopTime');

					$scope.maxMinIdleTimes = ReportsHelper.getMinMax($scope.report, 'idleTimeTripTotalSeconds');

					var
					lastInputGroup = {
						days: $scope.url.days,
						range: $scope.url.range,
						start: $scope.url.start,
						end: $scope.url.end
					};

					screenStorage.put('last', lastInputGroup);	
					
					if (results.reportData.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID and Reporting Period you entered. Please make sure the vehicle has Trip Logs enabled. If trip logs are enabled, try expanding the Reporting Period."};
					}

				});

			}// get report

			$scope.urLOL = $location.search();

			$scope.$watch('url.range', function() {

				if (!$scope.urLOL.days && !$scope.url.range && !$scope.last.days) {
					$scope.url.days = "7";
				}

				if (!$scope.urLOL.start && $scope.url.range && !$scope.last.start) {					
					$scope.url.start = $scope.monthPrior;
					$scope.url.end = $scope.today;
				}
			});

			if ( $scope.urLOL.vehicleId && $scope.urLOL.days || $scope.urLOL.vehicleId && $scope.urLOL.start && $scope.urLOL.end ) {
				$scope.getReport();
			} else {
				$scope.url = screenStorage.get('last', {}) || new Object();
			}

			function Column(columnKey, trnKey) {
				this.columnKey = columnKey;
			    this.trnKey = trnKey;	
			}

			var columns = new Collection(Column);
			columns.add('tripNumber','"Trip Number"');
			columns.add('startDate','"Start Date"');
			columns.add('startLatitude','"Start Coordinates"');
			columns.add('stopDate','"Stop Date"');
			columns.add('stopLatitude','"Stop Coordinates"');
			columns.add('tripMileage','"Distance"');
			columns.add('tripDurationMinutes','"Trip Length"');
			columns.add('hardAccelerationCount','"Hard Accel"');
			columns.add('hardBrakingCount','"Hard Brakes"');
			columns.add('idleTimeTripTotalSeconds','"Idle Time"');
			columns.add('speed0Seconds','"0 mph"');
			columns.add('speed60to75seconds','"60-70 mph"');
			columns.add('speed75to85seconds','"75-85 mph"');
			columns.add('speed85plusSeconds','"85+ mph"');
			columns.add('maxSpeed','"Max Speed"');

			
			$scope.columns = columns.get();
			$scope.hide = {
				startLatitude: true,
				stopLatitude: true,
			}
			angular.extend($scope.hide, screenStorage.get('hide'));
			$scope.toggleColumn = function(k) {
				$scope.hide[k] = !$scope.hide[k];
				screenStorage.put('hide', $scope.hide);
			};

			$scope.storageBinding = screenStorage.get();


			// IDLE FILTER ADDITIONS
			$scope.$watch('filter.idle', function(idle) {
				$scope.idlePct = ReportsHelper.percentageByRange($scope.report, 'speed0Seconds', idle);
			}, true);
			$scope.filterIdleTime = function(item) {
				var f = $scope.filter.idle;
				if(item.speed0Seconds >= f.min && item.speed0Seconds <= f.max) {
					return true;
				} else {
					return false;
				}
			};

			
		}

	});

});
/** @file */
