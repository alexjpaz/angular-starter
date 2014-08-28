angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-current-coupons', {
		pageTitle: 'Promotions: Current Coupons',
		controller: function ($scope, $location, $injector, $animate, $http, $filter, $timeout, CurrentCoupons, ReportsHelper, DeleteCoupon, CouponIntent, EditCoupon) {

			var 
			removeParams = {};
			$scope.couponAction = {};
			$scope.urLOL = angular.copy($location.search());
			$scope.url = $location.search();	
						
			if ($scope.urLOL.sag) {
				$location.search(removeParams);
				$scope.couponAction.completed = true;
				$scope.couponAction.text = "Coupon Successfully Added!";
			}
			if ($scope.urLOL.edit) {
				$location.search(removeParams);
				$scope.couponAction.completed = true;
				$scope.couponAction.text = "Coupon Successfully Edited!";
			}
			if ($scope.urLOL.mfg) {
				$location.search(removeParams);
				$scope.couponAction.completed = true;
				$scope.couponAction.text = "Manufacturer Coupon Successfully Added!";
			}

			$animate.enabled(false);
			
			UserSession = $injector.get('UserSession');

			$scope.reportLoading = false;
			$scope.page = {};
			$scope.page.title = 'Create Coupons by Service/DTC';
			$scope.page.thumbnailView = true;
						
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

			/*$scope.sort.sortDirection = [{
				'value': 'false', 
				'label': 'Ascending'	    
			}, {
				'value': 'true', 
				'label': 'Descending'	    
			}];*/

			$scope.sort.by = "$endDate";
			$scope.sort.reverse = true;

			$scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');
			$scope.todayUnix = Math.floor(Date.parse($scope.today)/1000);
			$scope.currentTimeUnix = Math.floor((new Date().getTime()/1000));
				
			function clear(){
				$scope.report = null;
			}

			$scope.getCoupons = function() {
				
				$scope.reportLoading = true;
				
				clear();

				var couponParams = {shopId: $scope.Session.busEntId}

				CurrentCoupons.query(couponParams, function(results){

					$scope.reportLoading = false;
					$scope.coupons = results;

					ReportsHelper.makeDateTimeSortKey($scope.coupons, 'MM/DD/YYYY', '$endDate', 'endDate');
					ReportsHelper.makeDateTimeSortKey($scope.coupons, 'MM/DD/YYYY', '$startDate', 'startDate');
					ReportsHelper.makeDateTimeSortKey($scope.coupons, 'MM/DD/YYYY', '$endExposureDate', 'endDisplayDate');
					
					if (results.length < 1) {
						$scope.report = {noResults: "Sorry, no coupons found for your shop."};
					}

				});

			}// get coupon data

			$scope.$watch('Session.busEntId', function (){
				if(angular.isNumber($scope.Session.busEntId)) {
					$scope.getCoupons();	
				}
			});

			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
				$scope.getCoupons();
			});

			//console.log($scope.Session);
			
			$scope.clipCoupon = function (coupon) {
				couponIntent();
			}//clip

			$scope.printCoupon = function (coupon) {
				couponIntent();
			}//print

			$scope.suspendCoupon = function (coupon) {

				coupon.couponStatus = "S";

				EditCoupon.save(coupon, function(response){
					console.log(response);
					$scope.getCoupons();
				}, function (error) {
					console.log(error);
				});

			}//suspend

			$scope.resumeCoupon = function (coupon) {

				coupon.couponStatus = "A";

				

				EditCoupon.save(coupon, function(response){
					console.log(response);
					$scope.getCoupons();
				}, function (error) {
					console.log(error);
				});

			}//suspend

			$scope.deleteCoupon = function (coupon) {

				$scope.urLOL.success = false;
				var	deleteParams = {promoCouponId: coupon.promoCouponId};

				DeleteCoupon.save(deleteParams, function(response){
					console.log(response);

					$scope.getCoupons();

					if (response.actionStatus === "SUCCESS") {
						$scope.urLOL.success = true;
						$scope.couponAction.completed = true;
						$scope.couponAction.text = "Coupon Successfully Deleted";
						//coupon.deleted = true;

						$timeout(function () {
							$scope.couponAction.completed = false;
							$scope.urLOL.success = false;						
						}, 2500)
					}// if success

				}, function(error) {
					console.log(error);
				});

			}//delete

			function couponIntent(promoCouponId, vehicleId) {

			}// intent

		}

	});

});
/** @file */
