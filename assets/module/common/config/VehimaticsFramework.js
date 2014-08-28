angular.module('vehimatics').config(function($injector, AppConfig) {
	var TemplateResolverProvider = $injector.get('TemplateResolverProvider');
	var ComponentTemplateResolverProvider = $injector.get('ComponentTemplateResolverProvider');

	var ResourceProvider = $injector.get('ResourceProvider');
	var FormResourceProvider = $injector.get('FormResourceProvider');

	TemplateResolverProvider.setBaseUrl(AppConfig.contextPath+'/assets/module');
	ComponentTemplateResolverProvider.setBaseComponentUrl(AppConfig.contextPath+'/assets/module/common/components');


	ResourceProvider.setRestUrl(AppConfig.restUrl);
	FormResourceProvider.setRestUrl(AppConfig.restUrl);
});
/** @file */
