angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-operations-with-parts', {
		pageTitle: "Operations with Parts",
		controller: function ($scope, $http ) {

			$scope.loading = false;

			$scope.filter = {};
			$scope.sort = {};
			$scope.sort.by = 'parts';
			$scope.sort.reverse = false;

			function clear(){
				$scope.report = null;
			}
	
			$scope.getReport = function() {
				
				clear();
				$scope.loading = true;

				var serviceUrl = '/telematics/rest/maintenance/schedule/report/operationsWithParts';

				$http({
					method:'GET',
					url: serviceUrl,
				}).then(function(results) {

					$scope.loading = false;
					$scope.report = results.data;
					
					$scope.totalOperations = results.data.length;

				});

			}

			$scope.getReport();
				
		}

	});

});
/** @file */
