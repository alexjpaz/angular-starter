angular.module('vehimatics').config(function(FormResourceProvider) {
	FormResourceProvider.register('ExampleFormResource', '/some/form/url/:id');
});
/** @file */
