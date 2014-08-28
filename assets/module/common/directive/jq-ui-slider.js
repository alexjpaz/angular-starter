angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Provide a shorthand for jquerySlider
	 * @function module:vehimatics.directive#jq-ui-slider
	 * @arg {object} jq-ui-slider - model 
	 * @arg {integer} min
	 * @arg {integer} max
	 */
	 DirectiveProvider.register('jq-ui-slider', function(jQuery) {
		 return {
			 scope: {'max':'@','min':'@','jqUiSlider':'='},
			 link: function(scope, element, attrs) {
				 var opts = {
					 range: true,
					 min: scope.min,
					 max: scope.max,
					 values: [scope.min, scope.max],
					 slide: function(e, ui) {
						 scope.jqUiSlider.min = ui.values[0];
						 scope.jqUiSlider.max = ui.values[1];
						 scope.$evalAsync();
					 }
				 };

				 var $slider = jQuery(element).slider(opts);

				 function updateMinMax() {
					 $slider.slider('option','max',scope.max);
					 $slider.slider('option','min',scope.min);
				 }

				 attrs.$observe('min', updateMinMax);
				 attrs.$observe('max', updateMinMax);
			 }
		 };
	 });
});
/** @file */
