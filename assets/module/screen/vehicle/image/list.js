angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-vehicle-image-list', {
			controller: function($scope, $routeParams, VehicleComplete, $upload, $window, Aws, $http, Rest) {
				$scope.r = $routeParams;

				$scope.refresh = function() {
					$scope.loadImages();
				};

				$scope.loadImages = function() {
					var params = {
						name: '',
						prefix: 'vehicle/'+$routeParams.vehicleId+'/'
					};

					Aws.listFile(params, function(r) {
						$scope.images = r.data.files;
					}, function() {
						$scope.images = {};
						$scope.images.error = true;

					});

										
				};

				$scope.deleteImage = function(image) {
					var name = image.replace("https://bucketimgs3.s3.amazonaws.com/","");

					Aws.deleteImageVehicle({
						name: name
					}, function() {
						$scope.refresh();
					});
				};
				
				$scope.imageUploadOptions = {
					key: function() {
						return 'vehicle/'+$routeParams.busEntId+'/'+(new Date().getTime());
					},
					policyFn: Aws.policyImageVehicle,
					params: $routeParams,
					sucess: function() {
						console.info("success");
					}
				};


				$scope.loadImages();
			}
	});
});

/** @file */
