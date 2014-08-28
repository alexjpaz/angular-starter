angular.module('vehimatics/translation').config(function(ResourceProvider, $provide) {
	ResourceProvider.register('Translation', '/translate/:code'); 
});
/** @file */
