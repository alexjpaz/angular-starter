angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#block-tab
	 * @type {module:vehimatics/framework.Component}
	 * @arg {String} block-title Title of the block
	 */
	 $compileProvider.directive('blockTab', function($compile, ComponentTemplateResolver, $window) {
		 return {
			 restrict: 'E',
			 scope: {'blockTitle':'@'},
			 templateUrl: ComponentTemplateResolver.resolve('block-tab','block'),
			 transclude: true,
			 compile: function(element, attrs) {
				 return {
					 post: function(scope, iElement, iAttrs, controller, transcludeFn) {
						 transcludeFn(function(tElement) {
							 if(tElement.filter('block-content').length === 0) {
								 element.find('block-content').append(tElement);
							 } else {
								 var elToMove = ['block-menu','block-content'];
								 angular.forEach(elToMove, function(el) {
									 element.find(el).append(tElement.filter(el));
								 });
							 }
						 });
					 }
				 };
			 },
			 controller: function($scope, Links, $attrs, $routeParams, $location) {
				 $scope.r = $routeParams;
				 $scope.path = $location.path();
				 $scope.links = Links.getGroup($attrs.links);

				 $scope.isMobile = false;

				 $( window ).resize(function(e) {
					 if(this.outerWidth <= 768) {	
						 $scope.isMobile = true;
					 } else {
						 $scope.isMobile = false;
					 }

					 $scope.$apply();
				 });

			 }
		 };
	 });
});
/** @file */
