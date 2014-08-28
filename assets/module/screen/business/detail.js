angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	$provide.service('EmailHelper', function() {
		this.getAddresses = function(emailAddresses) {
			var out = {};

			angular.forEach(business.emailAddresses, function(e) {
				if(e.emailTypeCode === "P") {
					out.primary = e.emailAddress;
				} else if(e.emailTypeCode === "A") {
					out.alt = e.emailAddress;
				}
			});

			return out;
		};
	});

	$provide.value('BusinessExtraGetParameters', function() {
		this.businessId = null;
	});

	ScreenProvider.register('screen-business-detail', {
		controller: function($scope, $routeParams, BusinessExtra, BusinessExtraGetParameters, App, BusinessUsers, EmailHelper, VehicleBusinessList) {	
			$scope.r = $routeParams;
			var getParams = new BusinessExtraGetParameters();

			getParams.busEntId = $routeParams.busEntId;

			BusinessExtra.get(getParams, function(business) {
				var mdl = business;

				mdl._email = EmailHelper.getAddresses(business.emailAddresses);

				$scope.mdl = mdl;
			}, function() {
				$scope.error = true;
			});

			BusinessUsers.query({busid:$routeParams.busEntId}, function(users) {
				$scope.users = users;
			});

			VehicleBusinessList.query(getParams, function(vehicles) {
				$scope.vehicles = vehicles;
			});
		}
	});
});
/** @file */
