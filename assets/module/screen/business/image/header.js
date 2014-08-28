angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {
	ScreenProvider.register('screen-business-image-header', {
			pageTitle: 'Business Logo',
			controller: function($scope, $routeParams, Aws) {
				var r = $routeParams;
				$scope.r = $routeParams;


				$scope.imageUploadOptions = {
					key: 'business/'+r.busEntId+'/logo',
					policyFn: Aws.policyImage,
					params: {
						id: r.busEntId,
						type: 'business',
						name: ""
					},
				};
			}
	});
});

/** @file */
