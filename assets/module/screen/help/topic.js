angular.module('vehimatics/screen').config(function(ScreenProvider, ContextHelpTopicResolverProvider) {
	ScreenProvider.register('screen-help-topic', {
		controller: function($scope, $routeParams, MongoTopicResource, $sce) {

			$scope.getTopic = function(params) {
				MongoTopicResource.get(params, function(topic) {
					topic.$sceContent = $sce.trustAsHtml(topic.content);
					$scope.topic = topic;
				}, function(rsp) {
					$scope.error = rsp.data;
				});
			};				

			$scope.getTopic({
					topicId: $routeParams.topicId
			});
		}
	});
});
/** @file */
