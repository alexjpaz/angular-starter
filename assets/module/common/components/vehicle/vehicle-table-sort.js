angular.module('vehimatics').config(function(ComponentProvider) {
	/**
	 * @function module:vehimatics.components#vehicle-table-sort
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('vehicle-table-sort', {
			 componentGroup: 'vehicle',
			 transclude: true,
			 scope: true,
			 link: function(scope, element, attrs) {
				 scope.sort = attrs.vehicleTableSort;
				 element.bind('click', function() {
					 if(scope.filter.sort === scope.sort) {
						 scope.filter.reverse = !scope.filter.reverse;
					 } else {
						 scope.filter.reverse = false;
					 }

					 scope.filter.sort = scope.sort;
					 scope.$apply();
				 });
			 },
	 });
});
/** @file */
