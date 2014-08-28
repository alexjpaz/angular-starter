angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Provide validation for input that require a valid phone number
	 *
	 * Example inputs: 
	 *    +1 999 555 1234
	 *    999 555 1234
	 *    9995551234
	 *    19995551234
	 *    1-999-555-1234
	 *
	 * The model value will always be the numeric portion of the input
	 * All  non-numeric characters are striped.
	 * @function module:vehimatics.directive#fa
	 * @arg {string} fa - icon to use (resolves to fa-name). Accepts interpolation for dynamic icons
	 */
	 DirectiveProvider.register('input-phone', function() {
		 var phoneNumberRegex = /^(\+?\d)?[ .-]?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;

		 return {
			 restrict: 'A',
			 require: '?ngModel',
			 priority: 1000,
			 link: function(scope, element, attrs, ngModel) {
				 if(!ngModel) return; 

				 function smsParser(input) {
					 ngModel.$setValidity('phone', phoneNumberRegex.test(input));
					 var formattedInput = input.replace(/\D/g,'');
					 return formattedInput;
				 }

				 ngModel.$parsers.push(smsParser);
			 }
		 };
	 });
})
/** @file */
