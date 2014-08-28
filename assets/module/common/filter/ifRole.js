angular.module('vehimatics').config(function($filterProvider) {
	/**
	 * @function module:vehimatics.filter#ifRole
	 * @arg {string} ifRole
	 */
	 $filterProvider.register('ifRole', function(UserSession) {
		 function ifRoleFilter(text, role) {
			 var output = '';

			 if(UserSession.userHasRole(role)) {
				 output = text;
			 }

			 return output;
		 }

		 return ifRoleFilter;
	 });
});
/** @file */
