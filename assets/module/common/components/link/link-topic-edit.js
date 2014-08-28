angular.module('vehimatics').config(function(ComponentProvider, $injector) {
	/**
	 * Helper to link to a help topic
	 * @function module:vehimatics.components#link-topic-edit
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('link-topic-edit', {
			 componentGroup: 'link',
			 replace: true,
			 scope: {'linkTopicEdit':'@'},
			 transclude: true,
			 controller: function($scope) {

			 }
	 });
});
/** @file */
