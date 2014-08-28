angular.module('vehimatics').config(function(DirectiveProvider) {
	DirectiveProvider.register('topic-tooltip', function($document, MongoTopicResource) {
		return {
			link: function(scope, element, attr) {
				var topicUrl = attr.topicTooltip;
				var options = {
					title: "Loading topic",
					content: "Loading topic"
				};

				var params = {
					topicId: attr.topicTooltip,
				};

				MongoTopicResource.get(params, function(topic) {
					options.title = topic.formats.tooltip || topic.content;
					//options.title = topic.title.toString();
					$(element).tooltip(options); //TODO: angulize;
				}, function() {
					console.error('TopicTooltip', params.topicId);
				});
			}
		};
	});
});
/** @file */
