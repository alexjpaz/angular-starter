angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-delayed-alerts-report', {
		pageTitle: 'Delayed Alerts',
		controller: function ($http, $scope, $location, $injector, Collection, Storage, ReportsHelper, $document, $window, $animate) {
			$animate.enabled(false);
			$scope.reportLoading = false;

			UserSession = $injector.get('UserSession');

			$scope.url = {};
			
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.url.maxAlerts = 25;
			
			$scope.$watch('url.includeAttNotifySendTiming', function() {

				if ($scope.url.includeAttNotifySendTiming){
					$scope.url.maxAlerts = 100;
				}

			});

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'reportRunDate';
			$scope.sort.reverse = true;
			
			function clear(){
				$scope.report = null;
			}

			$scope.language = {};
			$scope.language.select = "en";
			$scope.url.lang = $scope.language.select;

			$scope.shallow = true;

			$scope.reportBy = [
			
				{
			    	value: 'default', 
			    	label: 'Get report by...'	    
				}, {
			    	value: 'eventId', 
			    	label: 'Device Event Id'
				}, {
			    	value: 'vid', 
			    	label: 'Vehicle ID'
				}, {
					value: 'deviceSerialNo', 
			    	label: 'Device Serial'
		   		}, {
		   			value: 'systemHealth', 
		   			label: 'All Vehicles (System Health)'
		   		}
			
			];
		  	
		  	$scope.formControl = {};
		  	$scope.formControl.reportBySelect = $scope.reportBy[0];

		  	$scope.form = {};

			$scope.submit = function() {
				$scope.report = null;
				$scope.reportLoading = true;
		   		if ($scope.url.deviceSn) {
		   			delete $scope.url.deviceSn;
		   		}

		   		var 
		   		serviceUrl = '/telematics/rest/troubleshoot/',
		      	reportByType = $scope.formControl.reportBySelect.value;


				switch(reportByType) {
					case "eventId": 
						serviceUrl += "alert/timing/" + $scope.form.getReportBy;
						break;
						//device event id
					case "vid":
						serviceUrl += "report/alert/timing/" + $scope.form.getReportBy;
						break;
						//vid

					case "deviceSerialNo":
						serviceUrl += "report/alert/timing/0";
						$scope.url.deviceSn = $scope.form.getReportBy;
						//device serial
						break;
					case "systemHealth":
						serviceUrl += "report/alert/timing/0";
						//all vehicles (system health)
						break;
				}

				$http({
					method:'GET',
					url: serviceUrl,
					params: $scope.url
				}).then(function(results) {
					
					$scope.report = results.data;
					$scope.reportLoading = false;

					/*ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortAlertTimeLocal', 'alertTimeLocal');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortHaloReceivedTimeLocal', 'haloReceivedTimeLocal');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortAttReceivedTimeLocal', 'attReceivedTimeLocal');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY hh:mmA', '$sortSendFirstNotificationTimeLocal', 'sendFirstNotificationTimeLocal');*/

					if ($scope.formControl.reportBySelect.value !== "systemHealth") {

						$http({
							method:'GET',
							url: '/telematics/rest/vehicle/' + $scope.report.vehicleId,
						}).then(function(vehicleInfo) {					
							$scope.vehicleInfo = vehicleInfo.data;
						});

					}
					

				});

			};//end submit

			function Column(columnKey, trnKey) {
				this.columnKey = columnKey;
			    this.trnKey = trnKey;	
			}

			var screenStorage = Storage.getInstance('screen-delayed-alerts-report');

			var columns = new Collection(Column);
			columns.add('deviceEventId','"Event Id"');
			columns.add('eventType','"Type"');
			columns.add('pushAttempt','"Push #"');
			columns.add('alertTimeLocal','"Local Alert Time"');
			columns.add('haloReceivedTimeLocal','"Delphi Received"');
			columns.add('attReceivedTimeLocal','"ATT Received"');
			columns.add('sendFirstNotificationTimeLocal','"1st Alert Sent"');
			columns.add('graph1HaloReceivedSeconds','"Seconds to Delphi"');
			columns.add('graph2AttReceivedSeconds','"Seconds to ATT"');
			columns.add('graph3FirstAlertSendSeconds','"Seconds to 1st Send"');
			columns.add('gpsFixTimeLocal','"Local GPS Fix"');
			columns.add('graph4GpsFixSeconds','"Seconds to GPS Fix"');

			$scope.columns = columns.get();
			$scope.hide = screenStorage.get('hide', {}) || new Object();
			angular.extend($scope.hide, screenStorage.get('hide'));
			$scope.toggleColumn = function(k) {
				$scope.hide[k] = !$scope.hide[k];
				screenStorage.put('hide', $scope.hide);
			};
			
		}

	});

});
/** @file */
