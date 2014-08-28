angular.module('vehimatics').config(function(ComponentProvider, $injector) {
	/**
	 * @function module:vehimatics.components#link-topic
	 * @type {module:vehimatics/framework.Component}
	 * @arg {string} link-topic
	 */
	 ComponentProvider.register('link-topic', {
			 componentGroup: 'link',
			 replace: true,
			 scope: {'linkTopic':'@'},
			 transclude: true,
			 controller: function($scope) {

			 }
	 });

});
/** @file */
