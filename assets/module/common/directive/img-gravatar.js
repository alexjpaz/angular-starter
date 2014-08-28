angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * @function module:vehimatics.directive#img-gravatar
	 */
	 DirectiveProvider.register('img-gravatar', function($compile, $parse, Crypto, App, UserSession) {
		 return {
			 restrict: 'A',
			 priority: 1000,
			 terminal: true,
			 link: function(scope, element, attrs) {
				 function updateGravatar(loginId) {
					 var email = UserSession.getFirstEmail();
					 var hash = Crypto.md5(email);
					 var gravatarURL = 'https://secure.gravatar.com/avatar/'+hash+'?s=40&d=https%3A%2F%2Fs3.amazonaws.com%2Fbucketimgs3%2Fshared%2Fimg%2Fmystery_man.jpg';
					 attrs.$set('src', gravatarURL);
				 }

				 scope.$on('UserSession.refresh', updateGravatar);
			 }
		 };
	 });
});
/** @file */
