angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-create-sag-coupons-faq', {
		pageTitle: 'Create Coupons by SAG (Maintenance Operations / DTC)',
		controller: function ($http, $scope, $injector, $animate, AllSagCoupons, $location, $filter, EditCoupon, GetCoupon) {

			var removeParams = {};
			
			$scope.url = $location.search();
			$scope.urLOL = angular.copy($location.search());

			$animate.enabled(false);
			UserSession = $injector.get('UserSession');

			$scope.reportLoading = false;
			$scope.page = {};
			$scope.page.title = 'Create Coupons by Service/DTC';
			$scope.page.create = false;

			if ($location.search().sag || $location.search().edit || $location.search().mfg) {
				$scope.page.create = true;
			}

			$scope.page.dynamicButton1 = "Add to My Coupons";
		
	

			$scope.createView = function (sagArg) {
				//initialize the form defaults if they aren't passed in the url				
				if (!$scope.urLOL.coupon && !$scope.url.coupon) {
					$scope.url.coupon = {};
					$scope.urLOL.coupon = {};
					$scope.url.coupon.couponPercentOrValue = '$';
					$scope.url.coupon.couponLaborPartOrTotal = 'PARTS';				
				}
				if ($location.search().edit && !$scope.url.coupon.cssStyle || $location.search().sag && !$scope.url.coupon.cssStyle) {
					$scope.url.coupon.cssStyle = 'couponA';
					//console.log('coupon cssStyle initialized to: ' + $scope.url.coupon.cssStyle);
				}
				
				$scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');
					
					var yearLater = new Date();
					yearLater.setFullYear(yearLater.getFullYear()+1);
					var monthLater = new Date();
					monthLater.setDate(monthLater.getDate()+30);

				$scope.monthLater = $filter('date')(monthLater, 'MM/dd/yyyy');
				$scope.yearLater = $filter('date')(yearLater, 'MM/dd/yyyy');

				if (!$scope.urLOL.coupon.startDate) {
					$scope.url.coupon.startDate = $scope.today;
				}
				if (!$scope.urLOL.coupon.endDate) {
					$scope.url.coupon.endDate = $scope.monthLater;
				}

				var sagInt = parseInt(sagArg);
				$scope.page.create = true;
				$scope.page.action = "Create Coupon for SAG";
				$scope.url.sagParam = {sag: sagInt};
				$location.search($scope.url.sagParam);
				$scope.url.sagSelect = {sagId: sagInt};
				
			}

			$scope.sagView = function () {
				$scope.page.create = false;
				$location.search(removeParams);
			}

			$scope.myCoupons = function (click) {
				$location.path('/promos');
			}
			
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'sagDesc';
			$scope.sort.reverse = false;
	
			function clear(){
				$scope.report = null;
			}

			$scope.getSAG = function() {
				
				$scope.reportLoading = true;
				
				clear();

				AllSagCoupons.query(function(results){

					$scope.sag = results;
					$scope.reportLoading = false;

					if ($location.search().edit) {
						$scope.editSag();						
					}
					if ($location.search().sag) {
						//$scope.createView(parseInt($scope.url.sag));
						$scope.createView($scope.url.sag);
					}

					if (results.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID and Reporting Period you entered. Please make sure the vehicle has Trip Logs enabled. If trip logs are enabled, try expanding the Reporting Period."};
					}

				});

			}// get coupon data

			$scope.getSAG();

			$scope.$on('$locationChangeSuccess', function(e, new_path, old_path) {
			    
				sagUrlParam = $location.search().sag;

			    if (sagUrlParam) {
					$scope.createView(sagUrlParam);
				}
				if (angular.isDefined(sagUrlParam) == false && $location.path() !== '/promos') {
					$scope.sagView();
				}
		    
			});

			$scope.submit = function () {
				$scope.page.dynamicButton1 = "Adding Coupon...";
				$scope.url.coupon.sagId = $scope.url.sagSelect.sagId;
				$scope.url.coupon.busEntId = $scope.Session.busEntId;
				$scope.url.coupon.couponStatus = "A";
				if ($location.search().mfg) {
					$scope.url.coupon.originatingPromoCouponId = $scope.url.coupon.promoCouponId;	
				}
				if ($location.search().sag || $location.search().mfg) {
					serviceUrl = '/telematics/rest/coupon/create';	
				}
				if ($location.search().edit) {
					serviceUrl = '/telematics/rest/coupon/update';	
				}
								

				$http({
					method: 'POST',
					url: serviceUrl,
					data: $scope.url.coupon,
				}).then(function(response) {
					//console.debug(response.data);
					//console.log("OG coupon: " + $scope.url.coupon.originatingPromoCouponId);
					//console.log("current promoCouponId: " + $scope.url.coupon.promoCouponId);
					if (response.data.actionStatus == "SUCCESS") {
						//console.log('post actionStatus = ' +response.data.actionStatus);
						$scope.page.dynamicButton1 = "Coupon Added";
						$location.search('success', true);
						$location.path('/promos');
						//$location.search('edit', 'complete');
					}
				}, function(error) {
					//console.debug(error.data);			
				});

			} // end submit function

			$scope.editSag = function () {
				$scope.page.create = true;
	
				editParam = {promoCouponId: $location.search().edit};

				EditCoupon.get(editParam, function(results){
					$scope.url.coupon = results;
					
					if ($scope.url.coupon.couponType === "MFG") {
						$scope.page.action = "Preview Active Manufacturer Coupon"
					} else {
						$scope.page.action = "Edit SAG Coupon";
					}

					$scope.page.dynamicButton1 = "Save Changes";
					$scope.$watch('sag', function(){
						$scope.url.sagSelect = {sagId: $scope.url.coupon.sagId};
					});
				});
			}

			$scope.previewMfg = function () {

				$scope.page.action = 'Subscribe to Manufacturer Coupon';

				var getParam = {promoCouponId: $location.search().mfg}

				GetCoupon.get(getParam, function(results){
					$scope.url.coupon = results;
					$scope.page.dynamicButton1 = "Add MFG Coupon";
					$scope.$watch('sag', function(){
						$scope.url.sagSelect = {sagId: $scope.url.coupon.sagId};
					});
				});
			}

			if ($location.search().mfg) {
				$scope.mfg = true;
				$scope.previewMfg();
			}

			

		}

	});

});
/** @file */
