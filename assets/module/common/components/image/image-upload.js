angular.module('vehimatics').config(function(ComponentProvider) {
	/**
	 * @function module:vehimatics.components#image-upload
	 * @type {module:vehimatics/framework.Component}
	 * @arg {Object} image-upload
	 * @arg {boolean=} multiple
	 */
	 ComponentProvider.register('image-upload', {
			 componentGroup: 'image',
			 scope: {'imageUpload': '=','multiple':'@'},
			 controller: function($scope, $routeParams, VehicleComplete, $upload, $window, Aws, FileReaderHelper) {
				 $scope.r = $routeParams;

				 var isMultiple = $scope.multiple;
				 // options
				 var opts = $scope.imageUpload;
				 var policyFn = $scope.imageUpload.policyFn;
				 var getParams = $scope.imageUpload.params;

				 var upload = [];

				 function PutFileInS3(file) {
					 var up = {};
					 upload.push(up);

					 up.name = file.name;
					 up.working = true;

					 FileReaderHelper.readAsDataURL(file, function(e) {
						 up.dataUrl = e.target.result;
						 $scope.$apply();
					 });

					 var q = {};

					 q.success = function(s3) {
						 var key = null;

						 if(angular.isFunction($scope.imageUpload.key)) {
							 key = $scope.imageUpload.key();
						 } else {
							 key = $scope.imageUpload.key;
						 }

						 var uploadParams = {
							 url: s3.url,
							 method: 'POST',
							 file: file,
							 data: {
								 'key' : $scope.imageUpload.key,
								 'acl' : 'public-read',
								 //'Content-Type' : file.type,
								 'Content-Type' : 'image/png',
								 'AWSAccessKeyId': s3.AWSAccessKeyId,
								 'success_action_status' : '201',
								 'Policy' : s3.policy,
								 'Signature' : s3.signature
							 }
						 };

						 var promise = $upload.upload(uploadParams);

						 up.$promise = promise;

						 promise.progress(function(evt) {
							 up.progress = (parseInt(100.0 * evt.loaded / evt.total));
						 });

						 promise.success(function(data, status, headers, config) {
							 up.success = true;
							 up.working = false;
							 opts.success();
						 });

						 promise.error(function(data, status) {
							 up.working = false;
							 up.error = true;
							 up.errorStatus = status;
						 });
					 };

					 q.error = function() {
						 console.error('Could not get form policy!', arguments);
						 up.error = true;
						 up.working = false;
					 };


					 policyFn(getParams, q.success, q.error);
				 }


				 $scope.onFileSelect = function($files) {
					 if(isMultiple) {
						 for(var i=0;i<$files.length;i++) {
							 PutFileInS3($files[i]);
						 }
					 } else {
						 PutFileInS3($files[0]);
					 }
				 };

				 $scope.upload = upload;

				 $scope.$on('$locationChangeStart', function(e) {
					 var prompt = false;
					 var prevent = false;

					 angular.forEach(upload, function(up) {
						 if(up.working) {
							 prompt = true;
						 }
					 });

					 if(prompt) {
						 prevent = !$window.confirm('There are still some pending uploads. Are you sure you want to navigate away?');
					 }

					 if(prevent) {
						 e.preventDefault();
					 }
				 });
			 }

	 });
});

/** @file */
