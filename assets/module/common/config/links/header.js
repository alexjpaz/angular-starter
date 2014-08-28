angular.module('vehimatics').config(function($provide, LinksProvider) {

	LinksProvider.register('header', function(NavigationGroup) {
		var top = new NavigationGroup();

		top.add('#/dashboard', 'DASHBOARD');

		top.group('Admin', 'admin', ['ADMIN', 'SYSADMIN'])
		.add('#/admin/message', 'Message Admin');

		top.group('USER', 'users', ['SYSADMIN'])
		.add('#/user', 'ALL_USERS');

		top.group('VEHICLES', 'vehicle', ['ADMIN','SYSADMIN'])
		.add('#/vehicle', 'ALL_VEHICLES', 'vehicles_all', ['NO_ROLE']);

		top.group('BUSINESSES', 'business', ['ADMIN','SYSADMIN'])
		.add('#/business', 'ALL_BUSINESSES');

		top.group('Resources', 'resources')
		.add('#/resources/', 'Resources');



		top.group('Developer', 'developer', ['ADMIN', 'SYSADMIN'])
		.add('#/developer/app', 'Application Configuration')
		.add('#/developer/test/test', 'Test Page');

		return top.links;


	});
});
/** @file */
