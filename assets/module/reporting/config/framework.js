angular.module('vehimatics/reporting').config(function($injector) {
	var ComponentTemplateResolverProvider = $injector.get('ComponentTemplateResolverProvider');
	ComponentTemplateResolverProvider.setBaseComponentUrl('/framework_angular/assets/module/reporting/components');
});
/** @file */
