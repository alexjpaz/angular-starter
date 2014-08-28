angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	ResourceProvider.register('BusinessLight', '/account/businesses/light');
	ResourceProvider.register('BusinessExtra', '/account/business/ext/:busEntId');
	ResourceProvider.register('Business', '/account/business/:busEntId');
	ResourceProvider.register('BusinessUsers', '/manage/business/users');
	ResourceProvider.register('BusinessLocations', '/business/:busEntId/locations/telematics');
});
/** @file */
