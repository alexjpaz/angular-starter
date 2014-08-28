angular.module('vehimatics').config(function(ComponentProvider, $injector) {
	/**
	 * @function module:vehimatics.components#common-topic-popover
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('common-topic-popover', {
			 componentGroup: 'common',
			 replace: true,
			 scope: {},
			 controller: function($scope, $element, $http, $attrs, $document, MongoTopicResource, jQuery) {

				 var 
				 topicParam = {
					 topicId: $attrs.commonTopicPopover
				 },
				 options = {
					 html: true,
					 title: "Loading topic",
					 content: "Loading topic",
					 trigger: "manual"
				 };
				 $scope.popover = {
					 id: $attrs.commonTopicPopover
				 }

				 var $popel = $element.find('i');

				 $popel.bind('click', function(e) {
					 e.stopPropagation();
					 var $popelData = $popel.data('popover')

					 // Is popover attach to dom?
					 if(angular.isUndefined($popelData)) {
						 MongoTopicResource.get(topicParam, function(topic) {

							 if (topic.formats === null || topic.formats.popover === null) {
								 options.content = topic.content.toString();                     
							 } else if (topic.formats !== null && topic.formats.popover !== null) {
								 options.content = topic.formats.popover.toString()
							 }

							 options.title = topic.title.toString();
							 $popel.popover(options);
							 $popel.popover('show');
						 });
					 } else {
						 $popel.popover('toggle');
					 }
				 });

				 $document.bind('click', function() {
					 $popel.popover('hide')
				 });
			 }
	 });

});
/** @file */
