angular.module('vehimatics/reporting', ['vehimatics/framework']);

angular.module('vehimatics/reporting').config(function($injector) {
	var ComponentTemplateResolverProvider = $injector.get('ComponentTemplateResolverProvider');
	ComponentTemplateResolverProvider.setBaseComponentUrl('/framework_angular/assets/module/reporting/components');
});
/** @file */
/**
 * @module vehimatics/reporting
 */

 /**
  * @namespace filter
  * @memberof module:vehimatics/reporting
  */
/** @file */
