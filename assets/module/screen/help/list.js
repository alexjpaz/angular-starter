angular.module('vehimatics/screen').config(function(ScreenProvider, ContextHelpTopicResolverProvider) {
	ScreenProvider.register('screen-help-topic-list', {
		controller: function($scope, $routeParams, MongoTopicResource, $sce) {
			$scope.results = {};
			$scope.view = {
				search: true,
			};

			if($routeParams.view) {
				$scope.view = {};
				$scope.view[$routeParams.view] = true;
			}

			$scope.titleOverride = $routeParams.title;

			$scope.params = $routeParams;

			$scope.searchTopics = function(params) {
				if(params.search === "") {
					params.search = null;
				}

				MongoTopicResource.query(params, function(topics) {
					angular.forEach(topics, function(topic) {
						topic.$sceContent = $sce.trustAsHtml(topic.content);
					});
					$scope.results.topics = topics;
				}, function(rsp) {
					$scope.error = rsp.data;
				});
			};

			$scope.convertToText = function() {

			};

			$scope.searchTopics($routeParams);
		}
	});
});
/** @file */
