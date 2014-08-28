angular.module('vehimatics').config(function(ComponentProvider, $injector) {
	/**
	 * @function module:vehimatics.components#link-topic-tag
	 * @type {module:vehimatics/framework.Component}
	 * @arg {string} link-topic-tag
	 */
	 ComponentProvider.register('link-topic-tag', {
			 componentGroup: 'link',
			 replace: true,
			 scope: {'linkTopicTag':'@'},
			 transclude: true,
			 controller: function($scope) {

			 }
	 });

});
/** @file */
