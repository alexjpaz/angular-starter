angular.module('vehimatics').config(function(DirectiveProvider) {
	DirectiveProvider.register('topic', function($document, MongoTopicResource) {
		return {
			scope: true,
			link: function(scope, element, attr) {
				scope.topic = {};

				var params = {
					topicId: attr.topic
				};

				MongoTopicResource.get(params, function(topic) {
					scope.topic.content = topic.content.toString();
					scope.topic.title = topic.title.toString();
					scope.topic.contentText = topic.content.toString();
				});
			}
		};
	});
});
/** @file */
