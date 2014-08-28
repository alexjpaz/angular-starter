angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-print-coupon', {
		pageTitle: 'Print Coupon',
		controller: function ($http, $scope, $injector, $animate, $location, $filter, VehicleInfo, GetCoupon, Business, ReportsHelper) {

			var 
			removeParams = {},
			urLOL = angular.copy($location.search());	
			$scope.url = $location.search();
			$scope.reportLoading = false;

			$scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');
			$scope.todayUnix = Math.floor(Date.parse($scope.today)/1000);
			$scope.currentTimeUnix = Math.floor((new Date().getTime()/1000));
			//$animate.enabled(false);
			//UserSession = $injector.get('UserSession');

			if (urLOL.vehicleId) {
				var vehicleParams = {vehicleId: urLOL.vehicleId};

				VehicleInfo.get(vehicleParams, function(vehicle){
					$scope.vehicleInfo = vehicle;
					console.log($scope.vehicleInfo);
				});
			}// load vehicleInfo if vid query param

			if (urLOL.promoCouponId) {			
				$scope.reportLoading = true;
				var getParam = {promoCouponId: urLOL.promoCouponId, vid: $location.search().vehicleId};

				GetCoupon.get(getParam, function(results){
					$scope.url.coupon = results;
		
					$scope.url.coupon.$endDate = Math.floor(Date.parse($scope.url.coupon.endDate)/1000);
					$scope.url.coupon.$startDate = Math.floor(Date.parse($scope.url.coupon.startDate)/1000);
					$scope.url.coupon.$endExposureDate = Math.floor(Date.parse($scope.url.coupon.endDisplayDate)/1000);
					
					$scope.reportLoading = false;
					
				});
			}// load coupon if promoCouponId query param

			$scope.print = function () {
				window.print();
			}

			$scope.$watch('Session.busEntId', function (){
				if(angular.isNumber($scope.Session.busEntId)) {
					var bizParam = {busEntId:$scope.Session.busEntId};
					$scope.promoAdmin = {};

					Business.get(bizParam, function (results) {
						$scope.promoAdmin.shop = results;
						console.log($scope.promoAdmin.shop);
					});
				}
			});

		}//end controller

	});//end screen provider

});// end app module config
/** @file */
