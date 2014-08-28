angular.module('vehimatics').config(function($provide) {
	$provide.factory('Crypto', function() {
		function Crypto() {
			this.md5 = function(message) {
				return CryptoJS.MD5(message);
			};
		}

		return new Crypto();
	});
});
/** @file */
