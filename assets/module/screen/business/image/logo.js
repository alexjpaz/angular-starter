angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-user-image-upload', {
		controller: function($scope, $element, $upload, FileReaderHelper, $http, CanvasHelper, Aws, $routeParams) {
			var r = $routeParams;
			$scope.r = r;
			/* progress */
			$scope.imageLoaded = false;

			$scope.gotoStep = function(step) {
				if(step == 1) {
					$scope.imageLoaded = false;
				}

				$scope.step = step;
			};
			$scope.step = 1;


			$scope.reset = function() {
				$scope.imageLoaded = false;
			};

			$scope.onFileSelect = function($files) {
				var file = $files[0];

				FileReaderHelper.readAsDataURL(file, function(e) {
					var image = new Image();
					image.src = e.target.result;

					$scope.image = image.src;
					$scope.imgCropOptions.src = image.src;
					$scope.step = 2;
					$scope.$apply();
				});


				$scope.imageLoaded = true;
			};

			/* image crop */
			var imgOutput = {
				w: 139,
				h: 60
			};

			canvasHelper = new CanvasHelper();

			canvasHelper.setSize(imgOutput.w, imgOutput.h);

			$scope.imgCropOptions = {
				boxWidth: 640, 
				boxHeight: 480,
				aspectRatio: (imgOutput.w/imgOutput.h),
				onSelect: function(c) {
					$scope.$broadcast('imgCrop.onSelect', c);
				}
			};

			$scope.$on('imgCrop.onSelect',function cropRelease(evt, coords) {
				var image = new Image();
				image.src = $scope.image;
				canvasHelper.resizeAndCrop(image, coords);
				$scope.destImageUrl = canvasHelper.toDataURL();
				canvasHelper.toBlob(function(blob) {
					$scope.destImageBlob = blob;
				}, 'image/png');
				$scope.cropCoords = coords;
				$scope.$apply();

			});

			/* file upload */
			$scope.upload = function(file) {
				var upload = {};
				upload.working = true;

				var params = {
					type: 'business',
					id: r.busEntId,
					name: 'logo'
				};

				var success = function(s3) {
					var uploadParams = {
						url: s3.url,
						method: 'POST',
						file: file,
						data: {
							'key' : params.type+'/'+params.id+'/'+params.name,
							'acl' : 'public-read',
							'Content-Type' : 'image/png',
							'AWSAccessKeyId': s3.AWSAccessKeyId,
							'success_action_status' : '201',
							'Policy' : s3.policy,
							'Signature' : s3.signature
						},
					};

					var uploadPromise = $upload.upload(uploadParams);

					uploadPromise.progress(function(evt) {
						upload.progress = (parseInt(100.0 * evt.loaded / evt.total));
					});

					uploadPromise.success(function(rsp) {
						upload.success = true;
						upload.working = false;
					});

					uploadPromise.error(function(rsp) {
						upload.error = true;
						upload.working = false;
					});
				};

				var error = function() {
					upload.error = true;
					upload.working = false;
				};

				Aws.policyImage(params, success, error);
				$scope.upload = upload;
			};
		}

	});

});
/** @file */
