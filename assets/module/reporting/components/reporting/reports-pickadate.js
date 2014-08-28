angular.module('vehimatics/reporting').config(function(ComponentProvider, $injector) {
	/*
	 * @component reports-pickadate
	 * @param Object self - bind model
	 *
	 * @param max-date
	 * @param min-date
	 *
	 * <input reports-pickadate='date.end' min-date='date.start' />
	 *
	 */

	ComponentProvider.register('reports-pickadate', {
			componentGroup: 'reporting',
			replace: true,
			controller: function($scope, jqPickadate, $element, $parse, $attrs, moment) {
				$scope.c = {};
				$scope.c.name = $attrs.name;
				$scope.c.id = $attrs.id;
				var getter = $parse($attrs.reportsPickadate);
				var setter = getter.assign;

				var dateLimits = {
					max: false,
					min: false
				};

				var $el = $element.find('.pickerButton.pickadate');

				var defaults = {
					format: 'mm-dd-yyyy',
					dateMax: 365,
					clear: false,
					onOpen: function() {
						var d = {};
						angular.copy(dateLimits, d); // lovely, lovely pickadate_v2
						this.setDateLimit(d.max, true);
						this.setDateLimit(d.min);
					},
					onSelect: function() {
						var date = this.getDate();
						$scope.c.model = date;
						setter($scope, date);
						$scope.$apply();
					}
				};

				var opts = defaults;


				$scope.$watch($attrs.reportsPickadate, function() {
					$scope.c.model = getter($scope);
				});

				var pd = jqPickadate.bind($el,opts);

				var momentFormat = 'MM-DD-YYYY';

				function updateDate(dateVar) {
					return function(value) {
						if(angular.isUndefined(value)) {
							dateLimits[dateVar] = false;
						} else {		
							var marr = moment(value, momentFormat).toArray();
							marr[1]++; //HACK: need to bump for pickadate
							dateLimits[dateVar] = marr.slice(0,3);
						}
					}
				}

				$scope.$watch($attrs.maxDate, updateDate('max'), true);
				$scope.$watch($attrs.minDate, updateDate('min'), true);
			}
	});

});
/** @file */
