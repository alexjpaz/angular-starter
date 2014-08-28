angular.module('vehimatics/reporting').config(function(ComponentProvider, $provide) {
	$provide.service('ArrayHelper', function() {
		var i = null;
		var j = null;

		this.build = function(start, end, step) {
			var arr = [];
			for(i=start,j=0;i<=end;i+=step,j++) {
				arr[j] = ""+i;
			}
			return arr;
		};
	});

	ComponentProvider.register('reports-max-input', {
		componentGroup: 'reporting',
		replace: true,
		scope: {reportsMaxInput:'='},
		controller: function($scope, $filter, ArrayHelper) {
			$scope.label = function(a) {
				return a + " " + $filter('trn')("RESULTS");
			};

			$scope.arr = ArrayHelper.build(500, 3000, 500);
		}
	});

});
/** @file */
