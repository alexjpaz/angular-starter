angular.module('vehimatics/screen').config(function(ScreenProvider, ContextHelpTopicResolverProvider) {
	ScreenProvider.register('screen-help-topic-edit', {
		controller: function($scope, $routeParams, MongoTopicResource, $sce, $location, $window) {
			$scope.topic = {};
			$scope.title = 'Editing Topic';

			var isNew = $routeParams.topicId === 'new';
			
			//TOOD: shove into Enum
			var formats = [];
			formats.push("abbreviation");
			formats.push("faq");
			formats.push("popover");
			formats.push("modal");
			formats.push("tooltip");
			formats.push("excerpt");
			$scope.formats = formats;

			$scope.save = function() {
				var params = {};
				var data = $scope.topic;
				MongoTopicResource.save(data, function(topic) {
					$location.path('/help/topic/'+topic.id);
				}, function(rsp) {
					$scope.error = rsp.data;
				});
			};

			$scope.remove = function() {
				var answer = $window.confirm("Are you sure you want to remove this topic?");
				if(answer === false) return;
				var params = {
					topicId: $routeParams.topicId
				};
				MongoTopicResource.remove(params, function(topic) {
					$location.path('/help/topic/'+topic.id);
				}, function(rsp) {
					$scope.error = rsp.data;
				});
			};

			$scope.getTopic = function() {
				var params = {
					topicId: $routeParams.topicId
				};

				MongoTopicResource.get(params, function(topic) {

					var $tagsArray = [];
					angular.forEach(topic.tags, function(tag) {
						$tagsArray.push(tag.tag);
					});
					topic.$tagsString = $tagsArray.join(',');

					$scope.topic = topic;
				}, function(rsp) {
					//$scope.error = rsp.data;
				});
			};

			$scope.addFormat = function(format) {
				if(angular.isUndefined(format)) return;
				if(angular.isUndefined($scope.topic.formats) || $scope.topic.formats == null) {
					$scope.topic.formats = {};
				}

				if($scope.topic.formats[format] == null) {
					$scope.topic.formats[format] = "";
				}
			}

			$scope.getTopic($routeParams);

			$scope.sanitizedContentFormats = {};
			$scope.$watch('topic.title', function(title) {
				if(angular.isUndefined(title)) return;
				if(!isNew) return;

				title = title.replace(/[\?\ \/]/ig,'-'); 

				title = title.replace(/[^\a-zA-Z0-9\-]/ig,'');

				title = title.replace(/(-)+/ig,'-');

				title = title.toLowerCase();

				if (title.charAt(title.length-1) === '-') {
					title = title.substring(0, title.length-1);
				}

				$scope.topic.id = title;
			});

			$scope.$watch('topic.content', function(content) {
				$scope.sanitizedContent = $sce.trustAsHtml(content);
			});

			$scope.$watch('topic.formats', function(formats) {
				angular.forEach(formats, function(content,format) {
					$scope.sanitizedContentFormats[format] = $sce.trustAsHtml(content);
				});
			},true);

			$scope.$watch('topic.$tagsString', function($tagsString) {
				if(angular.isUndefined($tagsString)) return;
				var tags = $tagsString.split(',');

				$scope.topic.tags = [];
				angular.forEach(tags, function(tag) {
					tag = tag.trim();
					this.push({tag:tag});
				}, $scope.topic.tags);
			});
		}
	});
});
/** @file */
