angular.module('vehimatics').config(function(ComponentProvider, $injector) {
	/**
	 * @function module:vehimatics.components#common-pickadate
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('common-pickadate', {
			 componentGroup: 'common',
			 replace: true,
			 controller: function($scope, jqPickadate, $element, $parse, $attrs) {
				 $scope.c = {};
				 $scope.c.name = $attrs.name;
				 $scope.c.id = $attrs.id;
				 var getter = $parse($attrs.commonPickadate);
				 var setter = getter.assign;

				 var $el = $element.find('.pickerButton.pickadate');

				 var defaults = {
					 format: 'mm/dd/yyyy',
					 dateMax: 365,
					 clear: false,
					 onSelect: function() {
						 var date = this.getDate();
						 $scope.c.model = date;
						 setter($scope, date);
						 $scope.$apply();
					 }
				 };


				 $scope.$watch($attrs.commonPickadate, function() {
					 $scope.c.model = getter($scope);
				 });

				 var pd = jqPickadate.bind($el,defaults);
			 }
	 });

});
/** @file */
