angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-sag-coupons', {
		pageTitle: 'Coupons by Service/DTC',
		controller: function ($scope, $injector, $animate, AllSagCoupons) {

			$animate.enabled(false);
			UserSession = $injector.get('UserSession');

			$scope.reportLoading = false;
			$scope.page = {};
			$scope.page.title = 'Coupons by Service/DTC';
		
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'tripNumber';
			$scope.sort.reverse = true;

			$scope.block = {};
			$scope.block.links = {
				'Link 1': "/link1", 
				'Link 2': "/link2"
			}
			
			function clear(){
				$scope.report = null;
			}

			$scope.getSAG = function() {
				
				$scope.reportLoading = true;
				
				clear();

				/*var
				queryParams = $scope.url;*/

				AllSagCoupons.query(function(results){

					$scope.reportLoading = false;
					$scope.sag = results;
					
					if (results.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID and Reporting Period you entered. Please make sure the vehicle has Trip Logs enabled. If trip logs are enabled, try expanding the Reporting Period."};
					}

				});

			}// get coupon data

			$scope.getSAG();
		}

	});

});
/** @file */
