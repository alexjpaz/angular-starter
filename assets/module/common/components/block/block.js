angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.components#block
	 * @type {module:vehimatics/framework.Component}
	 * @arg {String=} block-title Title of the block
	 */
	 $compileProvider.directive('block', function($compile, ComponentTemplateResolver) {
		 return {
			 restrict: 'E',
			 scope: {'blockTitle':'@'},
			 templateUrl: ComponentTemplateResolver.resolve('block','block'),
			 transclude: true,
			 compile: function(element, attrs) {
				 return {
					 post: function(scope, iElement, iAttrs, controller, transcludeFn) {
						 transcludeFn(function(tElement) {
							 if(tElement.filter('block-content').length == 0) {
								 element.find('block-content').append(tElement);
							 } else {
								 var elToMove = ['block-menu','block-content'];
								 angular.forEach(elToMove, function(el) {
									 element.find(el).append(tElement.filter(el));
								 });
							 }
						 });
					 },
				 }
			 },

		 }
	 });
});
/** @file */
