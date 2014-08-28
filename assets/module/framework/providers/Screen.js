angular.module('vehimatics/framework').config(function($provide) {
	/**
	 *Registers a screen directive
	 * The name of the controller should match the class name of the screen templates div
	 * You would use a screen controller when you need to share logic or data between a multiple
	 * blocks or components
	 * @see(https://docs.angularjs.org/guide/directive)
	 * @name Screen
	 * @class
	 * @memberof module:vehimatics/framework
	 */
	 $provide.provider('Screen', function($compileProvider, StringHelperProvider, TemplateResolverProvider) {

		 /** 
		  * Used for unit testing
		  * @private
		  * @memberof module:vehimatics/framework.Screen */
		 this.__screenIds = [];

		/** 
		 * @method
		 * @memberof module:vehimatics/framework.Screen
		 * @param {String} screen_class_name - dash version of the component name (e.g. component-name)
		 * @param {object} screenDefinition - object literal that represents a directive object 
		 */
		 this.register = function(screen_class_name, screenDefinition) {
			 var componentName = StringHelperProvider.dashToCamel(screen_class_name);

			 this.__screenIds.push('screen-class-name');

			 var defaultComponentDefinition = {
				 restrict: 'C',
			 };

			 var finalComponentDefinition = {}

			 var componentDefinitionFn = function(AppConfig) {
				 defaultComponentDefinition.link = function() {
					 AppConfig.pageTitle = finalComponentDefinition.pageTitle || "";
				 };
				 angular.extend(finalComponentDefinition, defaultComponentDefinition, screenDefinition);
				 return finalComponentDefinition;
			 };

			 $compileProvider.directive(componentName, componentDefinitionFn);
		 };

		 this.$get = function() {
			 return this;
		 };
	 });

});
/** @file */
