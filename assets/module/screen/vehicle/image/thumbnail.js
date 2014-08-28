angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-vehicle-image-thumbnail', {
			pageTitle: 'Vehicle Thumbnail',
			controller: function($scope, $routeParams, Aws) {
				var r = $routeParams;
				$scope.r = $routeParams;

				$scope.imageUploadOptions = {
					key: 'vehicle/'+r.vehicleId+'/thumbnail',
					policyFn: Aws.policyImage,
					params: {
						id: r.vehicleId,
						type: 'vehicle',
						name: ""
					},
				};
			}
	});
});

/** @file */
