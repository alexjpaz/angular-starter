angular.module('vehimatics/screen').config(function(ScreenProvider, ContextHelpTopicResolverProvider) {
	ScreenProvider.register('screen-help-topic-search', {
		controller: function($scope, $routeParams, MongoTopicResource) {
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
