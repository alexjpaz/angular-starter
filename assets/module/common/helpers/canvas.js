angular.module('vehimatics').config(function($provide) {
	$provide.factory('CanvasHelper', function() {
		function CanvasHelper() {
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext("2d");
			var size = {
				width: 512,
				height: 512
			};

			this.setSize = function(width, height) {
				size.width = width;
				size.height = height;
			};

			this.resizeAndCrop = function(image, coords) {
				var width = size.width;
				var height = size.height;
				var c = coords;

				canvas.width = size.width;
				canvas.height = size.height;
				if(c.w > 0 && c.h > 0) {
					ctx.drawImage(image,c.x,c.y,c.w,c.h,0,0,width, height)
				}
			};

			this.toDataURL = function() {
				return canvas.toDataURL();
			};

			this.toBlob = function(callback, type) {
				canvas.toBlob(callback, type);
			};
		}

		return CanvasHelper;
	});

});
/** @file */
