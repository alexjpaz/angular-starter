angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-vehicle-users-report', {
		pageTitle: 'Vehicle Users Report',
		controller: function ($scope, $location, $injector, Collection, $animate, VehicleUsers, VehicleInfo) {
			$animate.enabled(false);
			
			$scope.reportLoading = false;

			UserSession = $injector.get('UserSession');

			$scope.url = $location.search();
			$scope.urLOL = angular.copy($location.search());
			
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

			
			$scope.shallow = true;

			$scope.getReport = function() {
				
				$scope.reportLoading = true;
				
				clear();
								
				var
				queryParams = $scope.url,
				vehicleParams = {vehicleId: $scope.url.vehicleId};

				VehicleInfo.get(vehicleParams, function(vehicle){
					$scope.vehicleInfo = vehicle;
				})


				VehicleUsers.query(queryParams, function(results){

					$scope.reportLoading = false;
					$scope.report = results;
										
					if ( results.length < 1 ) {
						$scope.report = {noResults: "Sorry, no users were found for the vid entered."};
					}

				});

			}
			if ( $scope.urLOL.vehicleId ) {
				$scope.getReport();
			}
						
		}

	});

});
/** @file */
