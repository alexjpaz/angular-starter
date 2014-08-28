angular.module('vehimatics').config(function(RouteScreenProvider) {
	RouteScreenProvider.when('/help/topic/:topicId*\/edit', 'help/edit');
	RouteScreenProvider.when('/help/topic', 'help/search');
	RouteScreenProvider.when('/help/topic/list', 'help/list');
	RouteScreenProvider.when('/help/topic/:topicId*', 'help/topic');

});
/** @file */
