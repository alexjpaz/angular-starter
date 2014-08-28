angular.module('vehimatics').config(function(RouteScreenProvider) {
	RouteScreenProvider.when('/developer', 'developer/index');
	RouteScreenProvider.when('/developer/app', 'developer/app');
	RouteScreenProvider.when('/developer/test/:page*', 'developer/test/__resolve');
	RouteScreenProvider.when('/developer/messages', 'developer/messages');
});

/** @file */
