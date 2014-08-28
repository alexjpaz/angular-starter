angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * Business Search Autocomplete
	 * @function module:vehimatics.components#business-ac
	 * @type {module:vehimatics/framework.Component}
	 * @arg {object} business-ac Title of the block
	 */
	 ComponentProvider.register('business-ac', {
			 componentGroup: 'business',
			 replace: true,
			 scope: {'businessAc':'='},
			 link: function(scope, element, attrs, ngModelController) {
			 },
			 controller: function($scope, BusinessLight, $element) {
				 $scope.q = {
					 per_page: 5,
					 page: 0
				 };

				 $scope.hover = function($index) {
					 $scope.$selectedIndex = $index;  
				 };

				 $scope.select = function(business) {
					 //$scope.q.search = business.businessName;
					 $scope.businessAc = business;
					 $scope.isFocused = false;
				 };

				 $scope.selectByIndex = function($index) {
					 return $scope.select($scope.results[$index]);
				 };

				 $element.bind('keydown', function(ev) {
					 var delta = 0;
					 switch(ev.keyCode) {
					 case 40: // Down
						 delta = +1;
						 break;
					 case 38: // Up
						 delta = -1;
						 break;
					 case 9: // Tab
						 ev.preventDefault();
						 if(ev.shiftKey) {
							 delta = -1;
						 } else {
							 delta = +1;  
						 }
						 break;
					 case 13: // Enter
						 $scope.selectByIndex($scope.$selectedIndex);
						 break;
					 default:
						 break;
						 //console.debug(ev.keyCode)
					 }


					 if(delta !== 0) {
						 $scope.$selectedIndex += delta;
					 } 

					 $scope.$apply();

				 });

				 $scope.change = function() {
					 var value = $scope.q.search;
					 $scope.$selectedIndex = -1;
					 if(value.length > 1) {
						 $scope.isFocused = true;
						 $scope.isSearching = true;
						 $scope.results = [];

						 BusinessLight.get($scope.q, function(results) {
							 $scope.results = results.businesses;
							 $scope.isSearching = false;
						 });

					 }
				 };
			 }
	 });

});
/** @file */
