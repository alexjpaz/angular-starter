angular.module('vehimatics').config(function($filterProvider) {
	/**
	 * @function module:vehimatics.filter#seconds2Minutes
	 * @author jayw
	 */
	 $filterProvider.register('seconds2Minutes', function() {
		 return function (seconds) {

			 var output = '';

			 if (angular.isDefined(seconds) && seconds !== null) {
				 var 
				 seconds = parseInt(seconds, 10),
				 minutes = Math.floor( seconds / 60),
				 remainder = seconds - (minutes * 60);	

				 if (seconds < 60) {
					 output = seconds + "s";
				 } else {
					 output = minutes + "min ";
					 if (remainder) {
						 output += remainder + "s"
					 }
				 }		
			 }
			 return output;
		 }
	 });
});
/** @file */
