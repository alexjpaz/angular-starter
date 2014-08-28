angular.module('vehimatics').config(function(ComponentProvider, $provide) {
	/**
	 * @function module:vehimatics.components#vehicle-nav
	 * @type {module:vehimatics/framework.Component}
	 * @deprecated use block-tab and app-links
	 */
	 ComponentProvider.register('vehicle-nav', {
			 componentGroup: 'vehicle',
			 replace: true,
			 controller: function($scope, $location, $routeParams, VehicleNavigation) {
				 $scope.r = $routeParams;
				 $scope.path = '#/'+$location.path();
				 $scope.links = VehicleNavigation;

				 $scope.vehicleId = $routeParams.vehicleId;
			 }
	 });
});

/** @file */
