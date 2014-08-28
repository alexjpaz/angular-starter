angular.module('vehimatics').config(function(DirectiveProvider) {
	DirectiveProvider.register('topic-popover', function($document, MongoTopicResource) {
		return {
			link: function(scope, element, attr) {
				var options = {
					html: true,
					title: "Loading topic",
					content: "Loading topic"
				};

				var params = {
					topicId: attr.topicPopover,
				};

				MongoTopicResource.get(params, function(topic) {
					options.content = topic.content.toString();
					options.title = topic.title.toString();

					$(element).popover(options) //TODO: angulize;
				}, function() {
					console.error('TopicPopover: Could not find topicId', params.topicId);
				});
			}
		};
	});
});
/** @file */
