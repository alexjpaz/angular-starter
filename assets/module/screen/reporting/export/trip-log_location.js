angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-trip-log-location-exporter', {
		pageTitle: 'Trip Log Report by Location',
		controller: function ($scope, $filter, $location, UserReports, UserAccount, BusinessLocations, VehicleReportingFleet, $injector, Collection, Storage, ReportsHelper, $document, $window, $animate) {

			$animate.enabled(false);

			$scope.limitToHack = 10;
			$document.bind('scroll', function() {
				if( $(window).scrollTop() >= ($(document).height() - $(window).height() - 150) ) {
					$scope.limitToHack += 10;
					$scope.$apply();
				}
			});

			$scope.reportLoading = false;
			$scope.fleet = true;

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
			
			var screenStorage = Storage.getInstance('screen-trip-log-location-exporter');
			$scope.last = screenStorage.get('last', {}) || new Object();
			$scope.url = $location.search();


			
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			UserAccount.get(function(user){

				$scope.userData = user;
				$scope.userData.support = $scope.userData.supportNumbers[user.languageCode];
				
				busParam = {
					busEntId: $scope.userData.busEntId
				}
				BusinessLocations.query(busParam, function(locations){
					$scope.locations = locations;
				});

			});

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'tripNumber';
			$scope.sort.reverse = true;

			$scope.sortSummary = {};
			$scope.sortSummary.by = 'tripMileageTotal';
			$scope.sortSummary.reverse = true;
			
			$scope.today = $filter('date')(new Date(), 'MM-dd-yyyy');
			
				var 
				monthPrior = new Date();
				monthPrior.setDate(monthPrior.getDate()-30);
				weekPrior = new Date();
				weekPrior.setDate(weekPrior.getDate()-7);
			
			$scope.monthPrior = $filter('date')(monthPrior, 'MM-dd-yyyy');
			$scope.weekPrior = $filter('date')(weekPrior, 'MM-dd-yyyy');
			
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

				VehicleReportingFleet.get(queryParams, function(results){

					$scope.reportLoading = false;
					$scope.report = results.reportData;
					$scope.totals = results.totals;
					$scope.summary = results.reportSummary;
					$scope.header = results.header;
					if ( results.notes ) {
						$scope.notes = results.notes[0];	
					}

					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortStartDate', 'startDate', 'startTime');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortStopDate', 'stopDate', 'stopTime');

					var
					lastInputGroup = {
						days: $scope.url.days,
						range: $scope.url.range,
						start: $scope.url.start,
						end: $scope.url.end,
						max: $scope.url.max
					};

					screenStorage.put('last', lastInputGroup);	
					
					if (results.reportData.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID and Reporting Period you entered. Please make sure the vehicle has Trip Logs enabled. If trip logs are enabled, try expanding the Reporting Period."};
					}

				});

			}//getReport

			$scope.urLOL = $location.search();

			$scope.$watch('url.range', function() {

				if (!$scope.urLOL.days && !$scope.url.range && !$scope.last.days) {
					$scope.url.days = "7";
				}

				if (!$scope.urLOL.start && $scope.url.range && !$scope.last.start) {					
					$scope.url.start = $scope.weekPrior;
					$scope.url.end = $scope.today;
				}
			});		

			if ( $scope.urLOL.busEntId && $scope.urLOL.days || $scope.urLOL.busEntId && $scope.urLOL.start && $scope.urLOL.end ) {
				$scope.getReport();
			} else {
				$scope.url = screenStorage.get('last', {}) || new Object();
			}
			if (!$scope.urLOL.max && !$scope.last.max) {
			    $scope.url.max = "500";
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
			columns.add('vehicleNickname','"Vehicle"');
			
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
				
		}

	});

});
/** @file */
