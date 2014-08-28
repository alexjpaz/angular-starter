angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-test-form', {
		controller: function($scope, ExampleFormResource, $injector, $http) {
			$scope.submit = function() {
				var postData = $scope.f; 
				ExampleFormResource.post(postData, function(data) {
					console.debug('data');
				});
			};

			$scope.submitHttp = function() {
				var postData = $scope.f; 
				$http({
					url: '/some/url',
					method: 'POST',
					data: postData,
					headers: $injector.get('FormUrlEncodedHeaders'),
					transformRequest: $injector.get('FormUrlEncodedRequestTransformer')
				}).then(function(data) {
					console.info('yay!');
				});
			};
		}
	});
});
/** @file */
