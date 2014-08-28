angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-alert-exporter', {
		pageTitle: 'Alert Report',
		controller: function ($scope, $location, UserAccount, UserReports, VehicleComplete, DeviceAlertTypes, VehicleReportingSingle, $filter, $interpolate, $injector, Collection, Storage, ReportsHelper, $animate) {
			$animate.enabled(false);

			$scope.alertTypeLabel = function(alertType) {
				var ifn = $interpolate("{{ alertType.eventType | trn}}");
				var text = ifn({
					alertType: alertType,
					// all: all
				});
				return text;
			};
			
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

			var 
			screenStorage = Storage.getInstance('screen-alert-exporter'),
			deviceParam = {
				query: "HAS_DEVICE"
			};
			$scope.last = screenStorage.get('last', {}) || new Object();
			$scope.url = $location.search();

			


			// if there is only one ?alertType query param $location.search()
			// returns a single string. Chosen needs an array for <select multiple>
			if(angular.isString($scope.url.alertType)) {
				$scope.url.alertType = [$scope.url.alertType];
			}	

			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.v = {};
			$scope.shallow = true;

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'deviceEventId';
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

			var 
			vehicleParam = {
				vehicleId: $scope.url.vehicleId
			},
			minParam = {
				query: "HAS_DEVICE"
			};



			$scope.getVehicle = function(vehicleParam) {
				VehicleComplete.get(vehicleParam, function(vehicle) {
					$scope.v = vehicle;

					var deviceParam = {
						deviceId: $scope.v.deviceInfo.deviceId
					};

					DeviceAlertTypes.query(deviceParam, function(alertTypes) {
						$scope.alertTypes = alertTypes;
					});
				});
			}//$scope.getVehicle
			
			$scope.$watch('url.vehicleId', function(vehicleParam) {
				
				if ($scope.url.vehicleId) {
					$scope.getVehicle({vehicleId: vehicleParam});
				}

			});

			$scope.getReport = function() {
				$scope.reportLoading = true;

				if(!$scope.url.range || $scope.url.range === false || $scope.url.range === undefined) {
					delete $scope.url.start;
					delete $scope.url.end;
				}
				if($scope.url.range === true) {
					delete $scope.url.days;
				}
				$scope.url.reportType = "alerts";
				$location.search($scope.url);
				clear();
				
				

				var
				queryParams = $scope.url;

				VehicleReportingSingle.get(queryParams, function(results){

					$scope.reportLoading = false;
					$scope.report = results.reportData;

					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortDate', 'alertDetail.dateStringAdjForTimezone', 'alertDetail.timeStringAdjForTimezone');
					

					var
					lastInputGroup = {
						days: $scope.url.days,
						range: $scope.url.range,
						start: $scope.url.start,
						end: $scope.url.end
					};

					screenStorage.put('last', lastInputGroup);
					
					if (results.reportData.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID, Alert Types and Reporting Period you entered. Please make sure the vehicle has settings configured and enabled for the chosen alerts. If the selected alerts are enabled for the vehicle, try expanding the Reporting Period."};
					}
					
					$scope.totalAlerts = $scope.report.length || "0";

				});				

			}//getReport

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
			if (!$scope.urLOL.max && !$scope.last.max) {
			    $scope.url.max = "500";
			}


			function Column(columnKey, trnKey) {
				this.columnKey = columnKey;
			    this.trnKey = trnKey;	
			}

			

			var columns = new Collection(Column);
			columns.add('deviceEventId','"Device Event ID"');
			columns.add('dateStringAdjForTimezone','"Date"');
			//columns.add('timeStringAdjForTimezone','"Time"');
			columns.add('tripNumber','"Trip Number"');
			columns.add('alertType','"Alert Type"');
			columns.add('eventDescription','"Description"');
			columns.add('latitude','"Coordinates"');
			columns.add('nearestAddress','"Nearest Address"');
			columns.add('additionalInfo','"Additional Info"');
			
			$scope.columns = columns.get();
			$scope.hide = {
				latitude: true,
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
