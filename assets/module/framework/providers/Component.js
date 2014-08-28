angular.module('vehimatics/framework').config(function($provide) {
	/**
	 * Special directive that has a controller and template
	 * @name Component
	 * @class
	 * @memberof module:vehimatics/framework
	 */
	$provide.provider('Component', function($compileProvider, StringHelperProvider, ComponentTemplateResolverProvider) {

		/** @memberof module:vehimatics/framework.Component */
		this.__componentIds = [];

		/** 
		 * @see {@link https://docs.angularjs.org/guide/directive}
		 * @method
		 * @memberof module:vehimatics/framework.Component 
		 */
		this.register = function(component_name, componentDefinition) {
			var componentName = StringHelperProvider.dashToCamel(component_name);

			this.__componentIds.push(component_name);

			var defaultComponentDefinition = {
				restrict: 'EA',
				scope: true,				
			};

			var finalComponentDefinition = {}

			finalComponentDefinition.templateUrl = ComponentTemplateResolverProvider.resolve(component_name, componentDefinition.componentGroup);

			angular.extend(finalComponentDefinition, defaultComponentDefinition, componentDefinition);

			var componentDefinitionFn = function() {
				return finalComponentDefinition;
			};

			$compileProvider.directive(componentName, componentDefinitionFn);
		};

		/** 
		 * @memberof module:vehimatics/framework.Component 
		 * @type {Provider}
		 * */
		this.$get = function() {
			return this;
		};
	});
});
/** @file */
