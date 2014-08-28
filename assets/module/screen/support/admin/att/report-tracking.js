angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-report-tracking-report', {
		pageTitle: 'Report Tracking',
		controller: function ($scope, $location, VehicleReportingList, $injector, Collection, Storage, ReportTracking, ReportsHelper, $document, $window, $animate) {
			$animate.enabled(false);
			$scope.reportLoading = false;

			UserSession = $injector.get('UserSession');

			$scope.url = $location.search();
			$scope.urLOL = $location.search();
			
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
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

			$scope.getReport = function() {
				
				$scope.reportLoading = true;
				$location.search($scope.url);

				clear();
								
				var
				queryParams = $scope.url;

				ReportTracking.query(queryParams, function(results){

					$scope.reportLoading = false;
					$scope.report = results;
					
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortStartDate', 'startDate');
					ReportsHelper.makeDateTimeSortKey($scope.report, 'MM/DD/YY', '$sortEndDate', 'endDate');
								
					if ( results.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found."};
					}

				});

			}

			$scope.getReport();
				

			function Column(columnKey, trnKey) {
				this.columnKey = columnKey;
			    this.trnKey = trnKey;	
			}

			var screenStorage = Storage.getInstance('screen-report-tracking-report');

			var columns = new Collection(Column);
			columns.add('loginId','"User"');
			columns.add('personId','"PID"');
			columns.add('reportType','"Report"');
			columns.add('reportRunDate','"Run Date"');
			columns.add('startDate','"Start"');
			columns.add('endDate','"End"');
			columns.add('environment','"Environment"');
			columns.add('reportRunMs','"Run Time"');
			columns.add('vehiclesQueried','"Vehicles Queried"');
			columns.add('vehiclesWithData','"w/ Data"');
			columns.add('Results','"Results"');
			columns.add('totals','"Totals"');
			columns.add('format','"Format"');
			columns.add('parameters','"Params"');
			columns.add('errorMessage','"Error"');	

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
