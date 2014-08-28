angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-create-sag-coupons', {
		pageTitle: 'Create Coupon by Trigger Template',
		controller: function ($http, $scope, $injector, $animate, AllSagCoupons, $location, $filter, EditCoupon, GetCoupon) {

			// TO DO
			// [] add ng-pattern to value to only allow numbers
			// [] add handling to disable add to my coupons button for MFG coupons that they've already added
			// [] finish error handling/messaging

			var 
			removeParams = {},
			actionCreateFromTrigger = 'Create Coupon w/ Trigger Template',
			actionSubscribeMFG = 'Subscribe to Manufacturer Coupon',
			actionPreviewMFG = 'Preview Active Manufacturer Coupon',
			actionEditCoupon = 'Edit Coupon',
			actionCopyCoupon = 'Create Editable Copy of Existing Coupon',
			saving = 'Saving Coupon...',
			adding = 'Adding Coupon...',
			save = 'Save Changes',
			add = 'Add to My Coupons',
			added = 'Coupon Added',
			addMFG = 'Add MFG Coupon',
			cannotModLive = "Sorry - coupons cannot be edited once they have gone live, but you can suspend the coupon and create an editable copy. Suspending the coupon will prevent it from showing to new customers, but will not invalidate it for users that have already clipped or printed it.",
			cannotModMFG = "The terms in this coupon have been set by a manufacturer and may not be edited - You can use this page to preview the coupon terms and offer the promotion to your customers by clicking 'Add to My Coupons' if you haven't already.";

			$scope.url = $location.search();
			$scope.urLOL = angular.copy($location.search());

			$animate.enabled(false);
			UserSession = $injector.get('UserSession');

			$scope.reportLoading = false;
			$scope.page = {};
			//$scope.page.title = actionCreateFromTrigger;
			$scope.page.create = false;
			$scope.page.disabledInput = false;
			$scope.page.error = false;
			$scope.page.actionSuccess = {};
			$scope.page.hideSubmit = false;
			//$scope.page.error = true;
			$scope.page.errorMessage = "There was an error retrieving the requested information. Coupon could not be found.";

			function buttonText(text) {
				$scope.page.dynamicButton1 = text;
			}

			buttonText(add);

			function disabledInputCheck (mfgCheck, editCheck) {
				if (mfgCheck === 'MFG') {
					$scope.page.disabledInput = true;
					$scope.page.error = true;
					$scope.page.errorMessage = cannotModMFG;			
				} else if (editCheck === false) {
					$scope.page.disabledInput = true;
					$scope.page.error = true;
					$scope.page.errorMessage = cannotModLive;			
				} 
			}

			if ($location.search().sag || $location.search().edit || $location.search().mfg) {
				$scope.page.create = true;
			}

			
		
			$scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');
				
				var yearLater = new Date();
				yearLater.setFullYear(yearLater.getFullYear()+1);
				var monthLater = new Date();
				monthLater.setDate(monthLater.getDate()+30);

			$scope.monthLater = $filter('date')(monthLater, 'MM/dd/yyyy');
			$scope.yearLater = $filter('date')(yearLater, 'MM/dd/yyyy');

			$scope.createView = function (sagArg) {
				//initialize the form defaults if they aren't passed in the url				
				if (!$scope.urLOL.coupon && !$scope.url.coupon) {
					$scope.url.coupon = {
						couponPercentOrValue: '$',
						couponLaborPartOrTotal: 'PARTS'
					};
					$scope.urLOL.coupon = {};
					//$scope.url.coupon.couponPercentOrValue = '$';
					//$scope.url.coupon.couponLaborPartOrTotal = 'PARTS';				
				}
				if ($location.search().edit && !$scope.url.coupon.cssStyle || $location.search().sag && !$scope.url.coupon.cssStyle) {
					$scope.url.coupon.cssStyle = 'couponA';
					//console.log('coupon cssStyle initialized to: ' + $scope.url.coupon.cssStyle);
				}
				
				if (!$scope.url.coupon.startDate) {
					$scope.url.coupon.startDate = $scope.today;
				}
				if (!$scope.url.coupon.endDate) {
					$scope.url.coupon.endDate = $scope.monthLater;
				}

				var sagInt = parseInt(sagArg);
				$scope.page.create = true;
				$scope.page.action = actionCreateFromTrigger;
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
					if ($location.search().copy) {
						$scope.copyCoupon($location.search().copy);
					}

					if (results.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID and Reporting Period you entered. Please make sure the vehicle has Trip Logs enabled. If trip logs are enabled, try expanding the Reporting Period."};
					}

				});

			}// get coupon data

			$scope.getSAG();

			$scope.$on('$locationChangeSuccess', function(e, new_path, old_path) {
			    
				var 
				sagUrlParam = $location.search().sag,
				copyUrlParam = $location.search().copy;


			    if (angular.isNumber(sagUrlParam)) {
					$scope.createView(sagUrlParam);
				}
				if (angular.isDefined(sagUrlParam) == false && $location.path() !== '/promos') {
					$scope.sagView();
				}
				if (angular.isNumber(copyUrlParam)) {
					$scope.copyCoupon(copyUrlParam);
				}

		    
			});

			$scope.submit = function () {
				serviceUrl = '/telematics/rest/coupon/';

				if ($location.search().edit) {
					serviceUrl += 'update';	
					buttonText(saving);
				} else {
					serviceUrl += 'create';
					buttonText(adding);	
				}
								
				$scope.url.coupon.sagId = $scope.url.sagSelect.sagId;
				$scope.url.coupon.busEntId = $scope.Session.busEntId;
				$scope.url.coupon.couponStatus = "A";
				
				if ($location.search().mfg) {
					$scope.url.coupon.originatingPromoCouponId = $scope.url.coupon.promoCouponId;	
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
						buttonText(added);
						$location.search('success', true);
						$location.path('/promos');
						//$location.search('edit', 'complete');
					}

					if (response.data.actionStatus == "FAIL") {
						$scope.page.error = true;
						$scope.page.errorMessage = response.data.message;
					}
				});

			} // end submit function

			$scope.editSag = function () {
				$scope.page.create = true;
	
				editParam = {promoCouponId: $location.search().edit};

				EditCoupon.get(editParam, function(results){
					$scope.url.coupon = results;
					
					if ($scope.url.coupon.couponType === "MFG") {
						$scope.page.action = actionPreviewMFG;
						$scope.page.hideSubmit = true;
					} else {
						$scope.page.action = actionEditCoupon;
						$scope.page.hideSubmit = false;
					}

					buttonText(save);
					disabledInputCheck($scope.url.coupon.couponType, $scope.url.coupon.couponCanBeModified);

					$scope.$watch('sag', function(){
						$scope.url.sagSelect = {sagId: $scope.url.coupon.sagId};
					});
				});
			}

			$scope.previewMfg = function () {
				
				buttonText(addMFG);
				$scope.page.action = actionSubscribeMFG;

				var getParam = {promoCouponId: $location.search().mfg}

				GetCoupon.get(getParam, function(results){
					$scope.url.coupon = results;
					
					if ($scope.url.coupon.couponType === "MFG") {
						$scope.page.mfg = true;
					}
						
					disabledInputCheck($scope.url.coupon.couponType, $scope.url.coupon.couponCanBeModified);

					$scope.$watch('sag', function(){
						$scope.url.sagSelect = {sagId: $scope.url.coupon.sagId};
					});
				});
			}

			if ($location.search().mfg) {		
				$scope.previewMfg();
			}

			/*if ($location.search().copy) {
				$scope.page.create = true;
				$scope.page.action = actionCopyCoupon;

				var copyParam = {promoCouponId: $location.search().copy};

				GetCoupon.get(copyParam, function(results) {
					$scope.url.coupon = results;
					
					$scope.url.coupon.startDate = $scope.today;
					$scope.url.coupon.endDate = $scope.monthLater;
					$scope.url.sagSelect = {sagId: $scope.url.coupon.sagId}
					console.log($scope.url.coupon);

				});
			}*/

			$scope.copyCoupon = function (couponId) {

				$scope.page.create = true;
				$scope.page.action = actionCopyCoupon;

				var copyParam = {promoCouponId: couponId} || {promoCouponId: $location.search.copy};

				GetCoupon.get(copyParam, function(results) {
					$scope.url.coupon = results;

					if ($scope.url.coupon.couponType === "MFG") {
						$scope.page.action = actionPreviewMFG;
						$scope.page.hideSubmit = true;
						$scope.page.error = true;
						$scope.page.errorMessage = cannotModMFG;
						$scope.page.disabledInput = true;
					}

					//disabledInputCheck($scope.url.coupon.couponType, $scope.url.coupon.couponCanBeModified);
					
					$scope.url.coupon.startDate = $scope.today;
					$scope.url.coupon.endDate = $scope.monthLater;
					$scope.url.sagSelect = {sagId: $scope.url.coupon.sagId}
					console.log($scope.url.coupon);

				});

			}

			$scope.suspendCoupon = function () {

				$scope.url.coupon.couponStatus = "S";

				EditCoupon.save($scope.url.coupon, function(response){
					console.log(response);
					//$scope.getCoupons();
					
					if (response.actionStatus === "SUCCESS") {
						$scope.error = false;
						$scope.page.actionSuccess.suspended = true;
						$scope.page.actionSuccess.suspendedMessage = response.message;
					}
					if (response.actionStatus === "FAIL") {
						$scope.error = true;
						$scope.page.errorMessage = response.message;
					}

						
				});

			}//suspend

			/*$scope.copyCoupon = function () {
				$location.search("copy="+$scope.url.coupon.promoCouponId);
			}*/

			$scope.editLive = function () {

				$scope.suspendCoupon();
				$scope.copyCoupon($scope.url.coupon.promoCouponId);

			}
			

		}

	});

});
/** @file */
