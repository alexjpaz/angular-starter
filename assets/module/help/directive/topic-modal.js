angular.module('vehimatics').config(function(DirectiveProvider) {
	DirectiveProvider.register('topic-modal', function($document, MongoTopicResource) {
		return {
			link: function(scope, element, attr) {
				var topicUrl = attr.topicPopover;
				var options = {
					html: true,
					title: "Loading topic",
					content: "Loading topic"
				};

				element.bind('click', function(e) {
					e.stopPropagation();
					MongoTopicResource.get(topicUrl, function(topic) {
						options.content = topic.content.toString();
						options.title = topic.title.toString();

						$(element).popover(options) //TODO: angulize;
						$(element).popover('toggle')
					});
				});

				$document.bind('click', function() {
					//$(element).popover('hide')
				});
			}
		};
	});
});
/** @file */
