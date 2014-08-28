angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * @function module:vehimatics.directive#img-crop
	 */
	 DirectiveProvider.register('img-crop', function() {
		 return {
			 priority: 4,
			 scope: {'imgCrop':'='},
			 link: function(scope, element, attrs) {
				 var $el = $(element);
				 var $img = null;

				 function doJcrop(src) {
					 if($img !== null) {
						 $img.remove();
					 }

					 $img = $('<img>').appendTo($el);

					 $img.attr('src',src);
					 $img.bind('load', function() {
						 var w = $img.width();
						 var h = $img.height();
						 var opts = {
							 setSelect: [w*0.1, h*0.1, w-(w*0.1), h-(h*0.1)]
						 };
						 angular.extend(opts, scope.imgCrop);

						 $img.css({ width: 'auto', height: 'auto'});
						 $img.Jcrop(opts);
					 });
				 }

				 scope.$watch('imgCrop.src', doJcrop);
			 }
		 };
	 });
});
/** @file */
