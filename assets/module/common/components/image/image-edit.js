angular.module('vehimatics').config(function(ComponentProvider) {
	/**
	 * @function module:vehimatics.components#image-edit
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('image-edit', {
			 componentGroup: 'image',
			 scope: {'imageEdit': '&'},
			 controller: function($scope, Aws, $element,FileReaderHelper) {
				 var sourceImg = $element.children()[0];
				 var canvas = document.createElement('canvas');
				 var ctx = canvas.getContext("2d");

				 $scope.step = 1;
				 $scope.imageLoaded = false;

				 $scope.gotoStep = function(step) {
					 if(step == 1) {
						 $scope.imageLoaded = false;
					 }

					 $scope.step = step;
				 };

				 $scope.imgCropOptions = {
					 boxWidth: 450, 
					 boxHeight: 400,
					 aspectRatio: 1,
					 onChange: cropChange
				 };

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

				 // need to change this
				 $scope.upload = function() {
					 Aws.get(function() {

						 for (var i = 0; i < $files.length; i++) {
							 var file = $files[i];
							 file.progress = parseInt(0);
							 (function (file, i) {
									 $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response) {
										 var s3Params = response;
										 $scope.upload[i] = $upload.upload({
												 url: 'https://' + $rootScope.config.awsConfig.bucket + '.s3.amazonaws.com/',
												 method: 'POST',
												 data: {
													 'key' : 's3UploadExample/'+ Math.round(Math.random()*10000) + '$$' + file.name,
													 'acl' : 'public-read',
													 'Content-Type' : file.type,
													 'AWSAccessKeyId': s3Params.AWSAccessKeyId,
													 'success_action_status' : '201',
													 'Policy' : s3Params.s3Policy,
													 'Signature' : s3Params.s3Signature
												 },
												 file: file,
										 }).then(function(response) {
										 file.progress = parseInt(100);
										 if (response.status === 201) {
											 var data = xml2json.parser(response.data),
											 parsedData;
											 parsedData = {
												 location: data.postresponse.location,
												 bucket: data.postresponse.bucket,
												 key: data.postresponse.key,
												 etag: data.postresponse.etag
											 };
											 $scope.imageUploads.push(parsedData);

										 } else {
											 alert('Upload Failed');
										 }
										 }, null, function(evt) {
											 file.progress =  parseInt(100.0 * evt.loaded / evt.total);
										 });
									 });
							 }(file, i));
						 }
						 console.debug('Aws', arguments);
					 });
				 };

				 function cropChange(coords) {
					 var image = new Image();
					 image.src = $scope.image;
					 drawImage(image, coords);
					 $scope.$apply();
				 }

				 function drawImage(img, coords) {
					 var MAX_WIDTH = 400;
					 var MAX_HEIGHT = 400;
					 var width = img.width;
					 var height = img.height;
					 var c = coords;

					 if (width > height) {
						 if (width > MAX_WIDTH) {
							 height *= MAX_WIDTH / width;
							 width = MAX_WIDTH;
						 }
					 } else {
						 if (height > MAX_HEIGHT) {
							 width *= MAX_HEIGHT / height;
							 height = MAX_HEIGHT;
						 }
					 }
					 canvas.width = width;
					 canvas.height = height;
					 if(c.w > 0 && c.h > 0) {
						 ctx.drawImage(img,c.x,c.y,c.w,c.h,0,0, width, height)
						 $scope.destImageUrl = canvas.toDataURL();
					 }
				 }
			 }
	 });
});
/** @file */
