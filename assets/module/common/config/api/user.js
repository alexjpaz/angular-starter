/**
*	The user service has several end points so we needed to make the resource
*	a little more complicated
*/
angular.module('vehimatics').config(function($provide) {
	$provide.factory('User', function($resource) {
		function RestUrl(url) {
			return '/telematics/rest/account'+url
		}

		function SaveAction(url) {
			this.method = 'POST';
			this.url = RestUrl(url);
		}

		function GetAction(url) {
			this.method = 'GET';
			this.url = RestUrl(url);
		}

		var paramDefaults = {};
		var actions = {
			"current": new GetAction('/user'),
			"list": new GetAction('/users'),
			"add": new SaveAction('/user/add'),
			"detail": new SaveAction('/user/ext/:personId')
		}

		return $resource('User', paramDefaults, actions);
	});
});

angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	ResourceProvider.register('GetUser', '/account/user/lookup');
	ResourceProvider.register('PasswordReset', '/process/pwd/reset');
	ResourceProvider.register('SecurityInfo', '/account/user/securityinfo/:personId');
});
/** @file */
