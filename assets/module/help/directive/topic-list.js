angular.module('vehimatics').config(function(DirectiveProvider) {
	DirectiveProvider.register('topic-list', function($document, MongoTopicResource) {
		return {
			scope: true,
			link: function(scope, element, attr) {
				scope.topic = {};

				var params = {
					tag: attr.topicList
				};

				MongoTopicResource.query(params, function(topics) {
					scope.topics = topics;
				});
			}
		};
	});
});
/** @file */
