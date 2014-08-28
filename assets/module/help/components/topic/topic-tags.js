angular.module('vehimatics').config(function(ComponentProvider, $injector) {

	ComponentProvider.register('topic-tags', {
			componentGroup: 'topic',
			replace: true,
			scope: {'topicTags':'='},
			transclude: true,
			controller: function($scope) {

			}
	});

});
/** @file */
