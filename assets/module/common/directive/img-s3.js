angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Shorthand for fontawesome
	 * @function module:vehimatics.directive#img-s3
	 */
	 DirectiveProvider.register('img-s3', function($compile, $parse, App) {
		 return {
			 restrict: 'A',
			 scope: {'imgS3':'@'},
			 link: function(scope, element, attrs) {
				 var imgUrl = "https://bucketimgs3.s3.amazonaws.com/";
				 attrs.$observe('imgS3', function(v) {
					 var u = imgUrl+v;
					 attrs.$set('src', u);
				 });
			 }
		 };
	 });
});
/** @file */
