angular.module('vehimatics').config(function($filterProvider) {
	/**
	 * @function module:vehimatics.filter#slashDate
	 */
	 $filterProvider.register('slashDate', function() {
		 return function (input) {

			 var output = '';

			 if (angular.isDefined(input)) {

				 var 
				 fullDate = input,
				 month = fullDate.substr(0,2),
				 day = fullDate.substr(2,2),
				 year = fullDate.substr(4,4);

				 output = month + "/" + day + "/" + year;

			 }

			 return output;
		 }
	 });
});
/** @file */
