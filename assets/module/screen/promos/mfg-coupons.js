angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-mfg-coupons', {
		pageTitle: 'Promotions: Manufactuerer Coupons',
		controller: function ($http, $scope, $injector, $animate, $location, $filter, MfgCoupons, ReportsHelper) {

			removeParams = {};
			
			$scope.url = $location.search();
			$scope.urLOL = angular.copy($location.search());

			$animate.enabled(false);
			
			UserSession = $injector.get('UserSession');

			$scope.reportLoading = false;
			$scope.page = {};
			$scope.page.title = 'Create Coupons by Service/DTC';
			$scope.page.thumbnailView = true;
						
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.filter = {};
			$scope.sort = {};
						
			$scope.sort.sortOptions = [{
				'value': 'startDate', 
				'label': 'Start Date'	    
			}, {
				'value': 'endDate', 
				'label': 'End Date'	    
			}, {
				'value': 'couponDesc', 
				'label': 'Title'	    
			}, {
				'value': 'couponText', 
				'label': 'Description'	    
			}, {
				'value': 'couponCode', 
				'label': 'Code'	    
			}, {
				'value': 'couponValueText', 
				'label': 'Value'	    
			}];

			$scope.sort.by = $scope.sort.sortOptions[1];
			$scope.sort.reverse = false;
			//$scope.reportBySelect = sort.sortOptions;

			$scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');
			$scope.todayUnix = Math.floor(Date.parse($scope.today)/1000);
			$scope.currentTimeUnix = Math.floor((new Date().getTime()/1000));
	
			function clear(){
				$scope.report = null;
			}

			$scope.getCoupons = function() {
				
				$scope.reportLoading = true;
				
				clear();

				MfgCoupons.query(function(results){

					$scope.reportLoading = false;
					$scope.coupons = results;

					ReportsHelper.makeDateTimeSortKey($scope.coupons, 'MM/DD/YYYY', '$endDate', 'endDate');
					ReportsHelper.makeDateTimeSortKey($scope.coupons, 'MM/DD/YYYY', '$startDate', 'startDate');
					ReportsHelper.makeDateTimeSortKey($scope.coupons, 'MM/DD/YYYY', '$endExposureDate', 'endDisplayDate');

					if (results.length < 1) {
						$scope.report = {noResults: "Sorry, no manufacturer coupons found."};
					}

				});

			}// get coupon data

			$scope.getCoupons();
			

		}

	});

});
/** @file */
