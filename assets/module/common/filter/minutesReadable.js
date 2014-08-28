angular.module('vehimatics').config(function($filterProvider) {
	/**
	 * @function module:vehimatics.filter#minutesReadable
	 * @author jayw
	 */
	 $filterProvider.register('minutesReadable', function() {
		 return function (minutes) {

			 var output = '';

			 if (angular.isDefined(minutes) && minutes !== null) {
				 var 
				 minutes = parseInt(minutes, 10),
				 hours = Math.floor( minutes / 60),
				 minutesRemainder = minutes % 60;
				 days = Math.floor(hours / 24);
				 hoursRemainder = hours % 24;

				 if (minutes && minutes < 60) {
					 output = minutes + " minutes";
				 } else {
					 if (days) {
						 output += days + " day"
						 if (days > 1) {output += "s"}
						 output += ", "
					 }
					 if (hours && hours < 24) {
						 output += hours + " hr";
						 if (hours > 1) {output += "s"}
						 output += ", "	
					 } else if (hoursRemainder && hours > 24) {
						 output += hoursRemainder + " hr"
						 if (hoursRemainder > 1) {output += "s"}
						 output += ", "	
					 }
					 if (minutesRemainder && minutes > 60) {
						 output += minutesRemainder + " min"
						 if (minutesRemainder > 1) {output += "s"}
						 output += ", "	
					 }
					 if (output.charAt(output.length-1) === " ")	{
						 output = output.substring(0, output.length-1);
					 }
					 if (output.charAt(output.length-1) === ",")	{
						 output = output.substring(0, output.length-1);
					 }
				 }
			 }
			 return output;
		 }
	 });
});
/** @file */
