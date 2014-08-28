angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {
	$provide.factory('EnumBusinessTypes', function() {
	});
	$provide.factory('BusinessQueryParameters', function() {
		function BusinessQueryParameters() {
			this.search = '';
			this.page = 0;
			this.rows = 10;
		}
		
		return BusinessQueryParameters;
	});

	ScreenProvider.register('screen-business-search', {
			pageTitle: 'Business Search',
			controller: function($scope, $location, BusinessQueryParameters, BusinessLight) {	
				$scope.q = new BusinessQueryParameters();
				$scope.m = {};

				angular.extend($scope.q, $location.search());

				$scope.selectedBusiness = null;
				
				$scope.search = function() {
					$location.search($scope.q);
					$scope.m.isSearching = true;
					$scope.m.error = false;
					$scope.result = {};
					$scope.pager = {};

					var success = function(result) {
						$scope.m.isSearching = false;
						$scope.result = result;

						$scope.pager = {};

						//TODO: move this to http transform, shove into $pager
						angular.forEach(result.links, function(link) {
							if(link.rel === 'next') {
								$scope.pager.next = true;
							}

							if(link.rel === 'previous') {
								$scope.pager.previous = true;
							}
						});
					};

					var error = function() {
						$scope.m.isSearching = false;
						$scope.m.error = true;
					};

					BusinessLight.get($scope.q, success, error);
				};

				$scope.page = function(delta) {
					$scope.q.page = +$scope.q.page + +delta;
					$scope.search();
				};

				$scope.search();
			}
	});
});
/** @file */
