angular.module('vehimatics/help').config(function(ResourceProvider, $provide) {
	/** 
	 * @class TopicResource 
	 * @memberof module:vehimatics/help
	* */
	ResourceProvider.register('TopicResource', '/learn/help/topic/:topicId');
});
/** @file */
