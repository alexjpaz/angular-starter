/**
*	Enums block
*
*	This should be put into "helpers/enum.js"
*/
angular.module('vehimatics').config(function($provide) {
	$provide.factory('Enum', function($http, MobileProviders, Countries) {
		function Enum() {
			this.mobileproviders = [];
			this.countries = [];
		}

		var instance = new Enum();

		// populate the enums later
		MobileProviders.query(function(mobileproviders) {
			instance.mobileproviders = mobileproviders;
		});

		Countries.query(function(countries) {
			instance.countries = countries;
		});

		return instance;
	});

	$provide.factory('Permissions', function(User) {
		function Permissions() {
			this.globalPermission = [];
		}

		var instance = new Permissions();

		User.current(function(user) {
			instance.globalPermissions = user.globalPermissions;
		});

		return instance;

	});
});

/**
* Application Setup
*
*/
angular.module('vehimatics').run(function($rootScope, $injector) {
	$rootScope.Enum = $injector.get('Enum'); // "Instantiates" the enum factory
});

/** @file */
