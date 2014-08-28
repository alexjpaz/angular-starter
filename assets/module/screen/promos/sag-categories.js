angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-sag-maintenance-categories', {
		pageTitle: 'SAG Maintenance Categories',
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

			$scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');
				
				var yearLater = new Date();
				yearLater.setFullYear(yearLater.getFullYear()+1);
				var monthLater = new Date();
				monthLater.setDate(monthLater.getDate()+30);

			$scope.monthLater = $filter('date')(monthLater, 'MM/dd/yyyy');
			$scope.yearLater = $filter('date')(yearLater, 'MM/dd/yyyy');
		
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

			$scope.getMaintSAG = function() {
				
				$scope.reportLoading = true;
				
				clear();

				maintParams = {groupTypeId: 3}

				AllSagCoupons.query(maintParams, function(results){

					$scope.sag = results;
					$scope.reportLoading = false;

					if (results.length < 1) {
						$scope.report = {noResults: "Sorry, no results were found for the Vehicle ID and Reporting Period you entered. Please make sure the vehicle has Trip Logs enabled. If trip logs are enabled, try expanding the Reporting Period."};
					}

				});

			}// get coupon data

			$scope.getMaintSAG();

		}

	});

});
/** @file */
