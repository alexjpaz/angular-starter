angular.module('vehimatics').config(function(DirectiveProvider) {
	/*
	 * @directive: th-sort-icon
	 */
	 DirectiveProvider.register('th-sort-icon', function() {
		 return {
			 link: function(scope, element, attr) {
				 function updateClass() {
					 attr.$removeClass('asc');
					 attr.$removeClass('desc');
					 if(scope.sort.by === attr.thSortIcon) {
						 if(scope.sort.reverse) {
							 attr.$addClass('asc');
						 } else {
							 attr.$addClass('desc');
						 }
					 }
				 }

				 scope.$watch('sort', updateClass, true);

				 element.bind('click', function() {
					 scope.sort.by = attr.thSortIcon;
					 scope.sort.reverse = !scope.sort.reverse;
					 updateClass();
					 scope.$apply();
				 });
			 }
		 };
	 });
});
/** @file */
